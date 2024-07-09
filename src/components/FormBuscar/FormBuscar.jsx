import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FormBuscar.css";
import BuscarButton from "../BotonBuscar/BotonBuscar";
import Swal from 'sweetalert2';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design

const { Option } = Select;

const FormBuscar = ({ setData, setSelectedMarca }) => {
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

  const handleSelectChange = (value) => {
    setSelectedValue(value);
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
        }, 100);
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    try {
      await fetchDataForSelectedValue();
    } finally {
      Swal.close(); //esto cierra el alert
    }
  };

  return (
    <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row justify-content-between">
        <div className="col-12 col-md-4">
          <label htmlFor="marca" className="label-spacing">Capsula</label>
          <Select
            showSearch
            value={selectedValue}
            placeholder="Selecciona una Capsula"
            onChange={handleSelectChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            className="form-control ant-select-fixed-width" // Añade esta clase
          >
            {miData.map((fila, index) => (
              <Option key={index} value={fila[1]}>
                {fila[0]}
              </Option>
            ))}
          </Select>
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
