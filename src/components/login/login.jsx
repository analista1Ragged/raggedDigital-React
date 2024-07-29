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
            const response = await axios.post('http://localhost:5000/logon', {
                usuario: usuario,
                contrasena: contrasena
            });

            if (response.data.message === "success") {
                sessionStorage.setItem('log', usuario);
                setMostrarExito(true);
                setTimeout(() => {
                    setMostrarExito(false);
                    navigate("/Home");
                }, 1500);

                // Limpiar los campos de usuario y contraseña
                actualizarNombre("");
                actualizarContrasena("");
            } else {
                setMostrarError(true);
                setTimeout(() => {
                    setMostrarError(false);
                    // También limpia los campos en caso de error
                    actualizarNombre("");
                    actualizarContrasena("");
                }, 1500);
            }
        } catch (error) {
            setMostrarError(true);
            console.error("Error en el login:", error);
            setTimeout(() => {
                setMostrarError(false);
                // Limpiar los campos en caso de excepción
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
            <form onSubmit={manejarEnvio}>
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
                    />
                    <CampoContraseña
                        titulo="Contraseña"
                        placeholder="Ingresar Contraseña:"
                        required
                        valor={contrasena}
                        actualizarValor={actualizarContrasena}
                        tipo="password" // Asegura que el tipo sea 'password' para ocultar la entrada
                    />
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
