import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import CampoTexto from "../CampoTexto";
import Boton from "../Boton/Boton";
import { useNavigate } from "react-router-dom";
import { Alert } from 'antd'; // Importa el componente de alerta de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS predeterminados de Ant Design

const Login = (props) => {
    const [usuario, actualizarNombre] = useState("");
    const [contrasena, actualizarContrasena] = useState("");
    const [mostrarExito, setMostrarExito] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null); // Nuevo estado para almacenar el número aleatorio
    const navigate = useNavigate();

    useEffect(() => {
        // Genera un número aleatorio entre 1 y 4 una vez cuando se monta el componente
        const randomNum = Math.floor(Math.random() * 4) + 1;
        setRandomNumber(randomNum);
    }, []);

    const imagePath = randomNumber !== null ? require(`../../assets/Images/R0${randomNumber}.png`) : null;

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/logon', {
                usuario: usuario,
                contrasena: contrasena
            });
            if (response.data.message === "success") {
                setMostrarExito(true); // Mostrar alerta de éxito
                setTimeout(() => {
                    setMostrarExito(false); // Ocultar alerta de éxito después de 1000ms
                    navigate("/Home"); // Redirige a la página de inicio
                }, 1500);
                actualizarNombre(""); // Limpiar campo de usuario
                actualizarContrasena(""); // Limpiar campo de contraseña
            } else {
                setMostrarError(true); // Mostrar alerta de error
                setTimeout(() => {
                    setMostrarError(false); // Ocultar alerta de error después de 1000ms
                    actualizarNombre(""); // Limpiar campo de usuario
                    actualizarContrasena(""); // Limpiar campo de contraseña
                }, 1500);
            }
        } catch (error) {
            setMostrarError(true); // Mostrar alerta de error si ocurre una excepción
            console.error("Error en el login:", error);
            setTimeout(() => {
                setMostrarError(false); // Ocultar alerta de error después de 1000ms
                actualizarNombre(""); // Limpiar campo de usuario
                actualizarContrasena(""); // Limpiar campo de contraseña
            }, 1500);
        }
    };

    return (
        <section className="formulario">
            <div className="image-container">
                {imagePath && <img src={imagePath} alt="Ragged" />} {/* Solo renderiza la imagen si imagePath no es null */}
            </div>
            <form onSubmit={manejarEnvio}>
                <div className="form-container">
                    <h2>¡Bienvenido a Ragged Digital!</h2>
                    <CampoTexto
                        titulo="Usuario"
                        placeholder="Ingresar Usuario:"
                        required
                        valor={usuario}
                        actualizarValor={actualizarNombre}
                    />
                    <CampoTexto
                        titulo="Contraseña"
                        placeholder="Ingresar Contraseña:"
                        required
                        valor={contrasena}
                        actualizarValor={actualizarContrasena}
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
