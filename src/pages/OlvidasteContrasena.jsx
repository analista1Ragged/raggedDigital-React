import React, { useState , useEffect } from "react";
import { Alert } from 'antd';
import axios from "axios";
import './OlvidasteContrasena.css';
import CampoTexto from "../components/CampoTexto/CampoTextoReferencia";
import Boton from "../components/Boton/Boton";

const OlvidasteContrasena = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/RaggedDigital/OlvidasteContrasena', { email });
            if (response.data.success) {
                setMessage("Se ha enviado un enlace de recuperación a tu correo electrónico.");
                setError(null);
            } else {
                setError("El correo electrónico no está registrado.");
                setMessage(null);
            }
        } catch (error) {
            setError("Hubo un error al enviar el enlace de recuperación.");
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
            <h2>¿Olvidaste tu contraseña?</h2>
            <p>Introduce tu correo electrónico para recibir un enlace de recuperación.</p>
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


