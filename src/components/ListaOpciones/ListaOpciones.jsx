import "../ListaOpciones/ListaOpciones.css"

const ListaOpciones = () => {


    return <div className="lista-opciones">
        <label>Seleccionar un banco</label>
        <select>
            <option value="" disabled defaultValue="" hidden>Seleccionar un banco</option>
        </select>
    </div>
}

export default ListaOpciones