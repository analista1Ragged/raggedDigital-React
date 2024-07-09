import AdjuntarArchivo from"../components/AdjuntarArchivo/AdjuntarArchivo"
import ListaOpciones from "../components/ListaOpciones/ListaOpciones"
import Boton from "../components/Boton/Boton"

const Bancos = () => {

    return <section className="formulario">
        <form>
            <h2>
                <a href="/contabilidad/Bancos" className="left" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
                 {'  '}
                Generar planos por banco.
            </h2>
            <AdjuntarArchivo

            />
            <ListaOpciones
                titulo="Seleccionar archivo"
                placeholder="Seleccionar archivo"
                required
            />
            <Boton>
                Generar Conciliación
            </Boton>
        </form>
    </section>
}

export default Bancos