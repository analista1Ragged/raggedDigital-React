import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FormBuscar.css";
import BuscarButton from "../BotonBuscar/BotonBuscar";
import 'bootstrap-icons/font/bootstrap-icons.css';

const FormBuscar = () => {
  // Estado para los datos de las cápsulas y el valor de referencia
  const [miData, setMiData] = useState([]);
  const [ref, setRef] = useState('');

  // Función para buscar los datos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/buscar');
        if (Array.isArray(response.data)) {
          setMiData(response.data);
        } else {
          console.error("Los datos obtenidos no son un array:", response.data);
        }
      } catch (error) {
        console.error("Error al buscar los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the data to the console whenever miData changes
    console.log('miData:', miData);
    miData.map((fila, index) => (
      console.log(index,fila[0],fila[1])
    ))
  }, [miData]);

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
              <option key={index} value={fila[1]}>
                {fila[0]}
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
          <div>
            <BuscarButton />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBuscar;
