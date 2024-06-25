import { useState } from "react";
import axios from "axios";
import "./login.css";
import CampoTexto from "../CampoTexto";
import Boton from "../Boton/Boton";
import { useNavigate } from "react-router-dom";
 
const Login = (props) => {
    const [usuario, actualizarNombre] = useState("");
    const [contrasena, actualizarContrasena] = useState("");
    const navigate = useNavigate();
 
    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/logon', {
                usuario: usuario,
                contrasena: contrasena
               
            });
            if (response.data.message === "success") {
                alert("Login exitoso");
               
                navigate("/Home"); // Redirige a la página de inicio
            }
        } catch (error) {
            alert("Usuario y/o contraseña incorrectos");
            //alert("error");
            console.error("Error en el login:", error);
        }
    };
 
    return (
        <section className="formulario">
            <div className="image-container">
                <img src={require("../../assets/Images/header.jpg")} alt='TiendaRagged' />
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
                    <Boton>
                        Ingresar
                    </Boton>
                </div>
            </form>
        </section>
    );
};
 
export default Login;