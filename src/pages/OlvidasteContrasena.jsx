import React, { useState, useEffect } from "react";
import { Alert } from 'antd';
import axios from "axios";
import './OlvidasteContrasena.css';
import CampoTexto from "../components/CampoTexto/CampoTextoReferencia";
import Boton from "../components/Boton/Boton";
import { urlapi } from '../App';

const OlvidasteContrasena = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(urlapi+'/recuperarC', { correo: "b" }); // Cambiar a 'correo'
            if (response.status === 200 && response.data.message === "success") {
                setMessage("Se ha enviado tu contraseña a tu correo electrónico.");
                setError(null);
            } else {
                setError("El correo electrónico no está registrado o es incorrecto.");
                setMessage(null);
            }
        } catch (error) {
            setError("Hubo un error al procesar tu solicitud.");
            setMessage(null);
        }
    };

    // useEffect para ocultar el mensaje después de 3 segundos
    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage(null);
                setError(null);
            }, 3000); // 3000 milisegundos = 3 segundos

            // Limpia el timeout si el componente se desmonta o el estado cambia
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    return (
        <section className="forgot-password-form">
            <a href="/RaggedDigital/Login" className="left button-large" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
            <h2>¿Olvidaste tu contraseña?</h2>
            <p>Introduce tu correo electrónico para recibir tu contraseña.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <CampoTexto
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduce tu correo electrónico"
                    />
                </div>
                <Boton type="submit" texto="Enviar">
                    Enviar
                </Boton>
            </form>
            {message && <Alert message={message} type="success" showIcon />}
            {error && <Alert message={error} type="error" showIcon />}
        </section>
    );
};

export default OlvidasteContrasena;
