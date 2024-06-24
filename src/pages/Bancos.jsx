import AdjuntarArchivo from"../components/AdjuntarArchivo/AdjuntarArchivo"
import ListaOpciones from "../components/ListaOpciones/ListaOpciones"
import Boton from "../components/Boton/Boton"

const Bancos = () => {

    return <section className="formulario">
            
        <form> 
        <h2>Generar planos por banco.</h2>
            
            <ListaOpciones/>
            <AdjuntarArchivo/>
            <Boton>
                Generar paquete CSV
            </Boton>
        </form>
    </section>
}

export default Bancos