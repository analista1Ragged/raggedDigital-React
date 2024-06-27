import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FormBuscar.css";
import BuscarButton from "../BotonBuscar/BotonBuscar";
import 'bootstrap-icons/font/bootstrap-icons.css';

const FormBuscar = ({ setData }) => {
  const [miData, setMiData] = useState([]);
  const [ref, setRef] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

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

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const sanitizeJSON = (str) => {
    // Reemplaza 'NaN' con 'null' para que sea JSON válido
    return str.replace(/NaN/g, 'null');
  };

  const fetchDataForSelectedValue = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/TraerLista', {
        marca: selectedValue,
        ref:ref,
      });
      console.log(response.data);

      const sanitizedData = sanitizeJSON(response.data);
      const parsedData = JSON.parse(sanitizedData);

      if (Array.isArray(parsedData) && parsedData.every(item => Array.isArray(item))) {
        setData(parsedData);
      } else {
        console.error('Expected a list of lists but received:', parsedData);
        setData([]);
      }
    } catch (error) {
      console.error("Error al traer los datos:", error);
    }
  };

  const BuscarClick = () => {
    fetchDataForSelectedValue();
  };

  return (
<form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
  <div className="row justify-content-between">
    <div className="col-12 col-md-4">
      <label htmlFor="marca">Capsula</label>
      <select name="marca" className="form-control" required onChange={handleSelectChange}>
        <option value="">Selecciona una Capsula</option>
        {miData.map((fila, index) => (
          <option key={index} value={fila[1]}>
            {fila[0]}
          </option>
        ))}
      </select>
    </div>
    <div className="col-12 col-md-4">
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
    <div className="col-12 col-md-2 d-flex align-items-end justify-content-center">
      <div>
      <BuscarButton onClick={BuscarClick} />
      </div>
    </div>
  </div>
</form>


  );
};

export default FormBuscar;
