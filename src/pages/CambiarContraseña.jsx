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
    const [contrasenaNueva, setContrasenaNueva] = useState("");  // Nueva contraseña
    const [confirmarContrasena, setConfirmarContrasena] = useState("");  // Confirmación de contraseña
    const [mostrarExito, setMostrarExito] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");
    const [randomNumber, setRandomNumber] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * 4) + 1;
        setRandomNumber(randomNum);
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        // Validar que las dos contraseñas coincidan
        if (contrasenaNueva !== confirmarContrasena) {
            setErrorMensaje("Las contraseñas no coinciden.");
            setMostrarError(true);
            return;
        }

        try {
            const usuario = sessionStorage.getItem('log');
            const response = await axios.post(urlapi+'/cambiarC', {
                correo: usuario,
                contra: contrasenaNueva  // Enviar solo la nueva contraseña
            });

            if (response.data.message === "success") {
                setMostrarError(false);
                setMostrarExito(true);
                setTimeout(() => {
                    setMostrarExito(false);
                    navigate("/Home");
                    window.location.reload();
                }, 2000);

                actualizarNombre("");
                setContrasenaNueva("");
                setConfirmarContrasena("");
            } else {
                setMostrarError(true);
                setTimeout(() => {
                    setMostrarError(false);
                    actualizarNombre("");
                    setContrasenaNueva("");
                    setConfirmarContrasena("");
                }, 1500);
            }
        } catch (error) {
            setErrorMensaje("Error al cambiar la contraseña.");
            setMostrarError(true);
            console.error("Error en el cambio de contraseña:", error);
            setTimeout(() => {
                setMostrarError(false);
                actualizarNombre("");
                setContrasenaNueva("");
                setConfirmarContrasena("");
            }, 1500);
        }
    };

    return (
        <section className="formulario">
            <form onSubmit={manejarEnvio}>
                <div className="form-container">
                    <h2>Cambiar Contraseña de acceso</h2>

                    <CampoContraseña
                        placeholder="Ingrese su contraseña nueva:"
                        required
                        valor={contrasenaNueva}
                        actualizarValor={setContrasenaNueva}
                        tipo="password"
                    />
                    <CampoContraseña
                        placeholder="Confirme su contraseña nueva:"
                        required
                        valor={confirmarContrasena}
                        actualizarValor={setConfirmarContrasena}
                        tipo="password"
                    />
                    <div className="forgot-password">
                    </div>
                    {mostrarExito && (
                        <Alert
                            message="¡Su cambio de contraseña ha sido exitoso!"
                            type="success"
                            showIcon
                        />
                    )}
                    {mostrarError && (
                        <Alert
                            message={errorMensaje}
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
