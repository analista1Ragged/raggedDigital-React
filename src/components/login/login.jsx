import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./login.css";
import CampoTexto from "../CampoTexto";
import Boton from "../Boton/Boton";
import { useNavigate } from "react-router-dom";
import { Alert } from 'antd'; 
import 'antd/dist/reset.css'; 
import TDiggital from '../../assets/Images/TDiggital.png';
import { AuthContext } from "../../context/AuthContext"; 
import CampoContraseña from "../CampoTexto/CampoContraseña";
import { urlapi } from '../../App';
import { Link } from 'react-router-dom';
import { RiCustomerServiceFill } from "react-icons/ri";

const Login = (props) => {
    const [usuario, actualizarNombre] = useState("");
    const [contrasena, actualizarContrasena] = useState("");
    const [mostrarExito, setMostrarExito] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * 4) + 1;
        setRandomNumber(randomNum);
    }, []);

    const imagePath = randomNumber !== null ? require(`../../assets/Images/R0${randomNumber}.png`) : null;

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(urlapi+'/logon', {
                usuario: usuario,
                contrasena: contrasena
            });

            if (response.data.message === "success") {
                sessionStorage.setItem('log', usuario);
                sessionStorage.setItem('auth', JSON.stringify(response.data.text+",99"));
                setMostrarExito(true);
                setTimeout(() => {
                    setMostrarExito(false);
                    navigate("/Home");
                    window.location.reload();
                }, 1500);

                actualizarNombre("");
                actualizarContrasena("");
            } else {
                setMostrarError(true);
                setTimeout(() => {
                    setMostrarError(false);
                    actualizarNombre("");
                    actualizarContrasena("");
                }, 1500);
            }
        } catch (error) {
            setMostrarError(true);
            console.error("Error en el login:", error);
            setTimeout(() => {
                setMostrarError(false);
                actualizarNombre("");
                actualizarContrasena("");
            }, 1500);
        }
    };

    return (
        <section className="formulario">
            <div className="image-container">
                {imagePath && <img src={imagePath} alt="Ragged" />}
            </div>
            <form action="/login" autocomplete="on" onSubmit={manejarEnvio}>
                <div className="form-container">
                    <div>
                        <img src={TDiggital} alt="TDiggital" className="TDiggital"/>
                    </div>
                    <h2>¡Bienvenido a Ragged Digital!</h2>
                    <CampoTexto
                        titulo="Usuario"
                        placeholder="Ingresar Usuario:"
                        required
                        valor={usuario}
                        actualizarValor={actualizarNombre}
                        type="text"
                        id="username"
                        name="username"
                        autocomplete="username"
                    />
                    <CampoContraseña
                        titulo="Contraseña"
                        placeholder="Ingresar Contraseña:"
                        required
                        valor={contrasena}
                        actualizarValor={actualizarContrasena}
                        type="password"
                        id="password"
                        name="password"
                        autocomplete="current-password"
                    />
                    <div className="forgot-password">
                    <Link to="/OlvidasteContrasena">¿Olvidaste tu contraseña?</Link>
                    <br/><br/>
                    <a href="https://glpi.ragged.com.co" target="_blank" rel="noopener noreferrer">
                        <RiCustomerServiceFill 
                            className="top-bar-icon"
                            title='Mesa de Ayuda'
                        />
                    </a>
                    </div>
                    {mostrarExito && (
                        <Alert
                            message="¡Inicio de sesión exitoso!"
                            type="success"
                            showIcon
                        />
                    )}
                    {mostrarError && (
                        <Alert
                            message="Error correo y/o usuario incorrectos"
                            type="error"
                            showIcon
                        />
                    )}
                    <Boton>
                        Ingresar
                    </Boton>
                </div>
            </form>
        </section>
    );
};

export default Login;
