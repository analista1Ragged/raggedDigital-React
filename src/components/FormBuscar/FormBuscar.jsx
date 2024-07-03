// FormBuscar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FormBuscar.css";
import BuscarButton from "../BotonBuscar/BotonBuscar";
import Swal from 'sweetalert2';

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

  const sanitizeJSON = (str) => {
    return str.replace(/NaN/g, 'null');
  };

  const fetchDataForSelectedValue = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/TraerLista', {
        marca: selectedValue,
        ref: ref,
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

  const handleSelectChange = async (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Aquí puedes llamar a fetchDataForSelectedValue si quieres cargar los datos inmediatamente al seleccionar
    // await fetchDataForSelectedValue();
  };

  const BuscarClick = async () => {
    let timerInterval;
    Swal.fire({
      title: 'Cargando Datos...',
      text: 'Por favor, espere mientras se cargan los datos.',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    try {
      await fetchDataForSelectedValue();
    } finally {
      Swal.close();
    }
  };

  return (
    <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row justify-content-between">
        <div className="col-12 col-md-4">
          <label htmlFor="marca" className="label-spacing">Capsula</label>
          <select
            name="marca"
            className="form-control"
            required
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="">Selecciona una Capsula</option>
            {miData.map((fila, index) => (
              <option key={index} value={fila[1]}>
                {fila[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="nombre" className="label-spacing">Referencia (opcional)</label>
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
