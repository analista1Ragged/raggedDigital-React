import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FormBuscar.css";
import BuscarButton from "../BotonBuscar/BotonBuscar";
import Swal from 'sweetalert2';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import { urlapi } from '../../App';

const { Option } = Select;

const FormBuscar = ({ setData, nuevoNombre, nuevoMarca }) => {
  const [miData, setMiData] = useState([]);
  const [ref, setRef] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [nombre, setSelectedNombre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlapi+'/buscar');
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
      const response = await axios.post(urlapi+'/TraerLista', {
        marca: selectedValue,
        ref: nombre,
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
    console.log(value);
    setSelectedValue(value);
    nuevoMarca(value);
  };
  const handleNombreChange = (e) => {
    setSelectedNombre(e.target.value);
    nuevoNombre(e.target.value); // Aquí se pasa el nombre seleccionado a TicketTable
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
  <div className="row align-items-end"> {/* Alineación al final de la fila */}
    <div className="col-12 col-md-5">
      <label htmlFor="marca" className="label-spacing">Capsula</label>
      <div>
        <Select
          style={{ width: 350 }}
          showSearch
          value={selectedValue}
          placeholder="Selecciona una Capsula"
          onChange={handleSelectChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          className="w-100" // Asegura que el select ocupe el 100% del ancho disponible
        >
          {miData.map((fila, index) => (
            <Option key={index} value={fila[1]}>
              {fila[0]}
            </Option>
          ))}
        </Select>
        </div>
    </div>
    <div className="col-12 col-md-5">
      <label htmlFor="nombre" className="label-spacing">Referencia (opcional)</label>
      <input
        type="text"
        name="nombre"
        className="form-control"
        placeholder="Nombre del producto..."
        onChange={handleNombreChange}
      />
    </div>
    <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
      <BuscarButton onClick={BuscarClick} />
    </div>
  </div>
</form>


  );
};

export default FormBuscar;


