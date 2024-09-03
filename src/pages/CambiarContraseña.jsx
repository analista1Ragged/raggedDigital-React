import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./CambiarContraseña.css";
import CampoTexto from "../components/CampoTexto";
import Boton from "../components/Boton/Boton";
import { useNavigate } from "react-router-dom";
import { Alert } from 'antd'; 
import 'antd/dist/reset.css'; 
import { AuthContext } from "../context/AuthContext"; 
import CampoContraseña from "../components/CampoTexto/CampoContraseña";
import { urlapi } from '../App';
import { Link } from 'react-router-dom';

const CambiarContraseña = (props) => {
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


    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(urlapi+'/logon', {
                usuario: usuario,
                contrasena: contrasena
            });

            if (response.data.message === "success") {
                sessionStorage.setItem('log', usuario);
                sessionStorage.setItem('auth', JSON.stringify(response.data.text));
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
            <form onSubmit={manejarEnvio}>
                <div className="form-container">
                    <h2>Cambiar Contraseña de acceso</h2>
                    {/* <CampoTexto 
                        placeholder="Ingresar Usuario:"
                        required
                        valor={usuario}
                        actualizarValor={actualizarNombre}
                    />*/}
                    <CampoContraseña
                        placeholder="Ingrese su contraseña nueva:"
                        required
                        valor={contrasena}
                        actualizarValor={actualizarContrasena}
                        tipo="password"
                    />
                    <CampoContraseña
                        placeholder="Confirme su contraseña nueva:"
                        required
                        valor={contrasena}
                        actualizarValor={actualizarContrasena}
                        tipo="password"
                    />
                    <div className="forgot-password">
                    </div>
                    {mostrarExito && (
                        <Alert
                            message="¡Su cambio de contraseña ha sido exitosa!"
                            type="success"
                            showIcon
                        />
                    )}
                    {mostrarError && (
                        <Alert
                            message="Error, las contraseñas no coinciden"
                            type="error"
                            showIcon
                        />
                    )}
                    <Boton>
                        Cambiar Contraseña
                    </Boton>
                </div>
            </form>
        </section>
    );
};

export default CambiarContraseña;