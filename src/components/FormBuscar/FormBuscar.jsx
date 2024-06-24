import React, { useState } from 'react';
import "./FormBuscar.css"
import BuscarButton from "../BotonBuscar/BotonBuscar"
import 'bootstrap-icons/font/bootstrap-icons.css';



const FormBuscar = () => {
  // Estado para los datos de las cápsulas y el valor de referencia
  const [miData, setMiData] = useState([
    // Aquí se deben inicializar los datos. Ejemplo:
    // ['1', 'Capsula 1', 'capsula_1', 'Capsula Uno'],
    // ['2', 'Capsula 2', 'capsula_2', 'Capsula Dos']
  ]);
  const [ref, setRef] = useState('');

  const BuscarClick = () => {
    // Lógica para manejar la búsqueda
    console.log('Buscar clickeado');
  };

  return (
    
    <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row">
        <div className="col">
          <label htmlFor="marca">Capsula</label>
          <select name="marca" className="form-control" required>
            <option value="">Selecciona una Capsula</option>
            {miData.map((fila, index) => (
              <option key={index} value={fila[2]}>
                {fila[3]}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="nombre">Referencia (opcional)</label>
          <input
            type="text"
            name="ref"
            className="form-control"
            placeholder="PF21120055,PF11511297,PF21340007..."
            value={ref}
            onChange={(e) => setRef(e.target.value)}
          />
        </div>
        <div className="col" style={{ display: 'flex' }}>
          <div  >
          <BuscarButton/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBuscar;
