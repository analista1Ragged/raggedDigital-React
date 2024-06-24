import { useState } from "react"
import "./login.css"
import CampoTexto from "../CampoTexto"
import Boton from "../Boton/Boton"

const Login = (props) => {

    const [usuario, actualizarNombre] = useState("")
    const [contraseña, actualizarPuesto] = useState("")

    const { registrarColaborador } = props

    const manejarEnvio = (e) => {
        e.preventDefault()
        console.log("Manejar el envio")
        let datosAEnviar = {
            usuario,
            contraseña
        }
        registrarColaborador(datosAEnviar)
    } 

    return <section className="formulario">
        
        <div className="image-container">
        <img src={require("../../assets/Images/header.jpg")} alt='TiendaRagged' />
        </div>

        <form >
            <div className="form-container">
                <h2>¡ Bienvenido a Ragged Digital !</h2>
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
                    valor={contraseña}
                    actualizarValor={actualizarPuesto}
                />
                <Boton>
                    Ingresar
                </Boton>
            </div>        
        </form>
    </section>
}

export default Login