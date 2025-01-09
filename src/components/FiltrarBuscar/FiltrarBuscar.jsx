import React, { useState } from 'react';
import { Select } from 'antd';
import CheckboxPerfiles from '../CheckboxPefiles/CheckboxPerfiles';
import 'antd/dist/reset.css';

const { Option } = Select;

const FiltrarBuscar = ({ onFilterChange }) => {
  const [escalaPrecio, setEscalaPrecio] = useState(''); // Número
  const [almacen, setAlmacen] = useState(''); // Opción seleccionada
  const [precioObsequio, setPrecioObsequio] = useState(false); // Binario 1 o 0

  const handleEscalaPrecioChange = (event) => {
    setEscalaPrecio(event.target.value);
    onFilterChange(event.target.value, almacen, precioObsequio ? '1' : '0');
  };

  const handleAlmacenChange = (value) => {
    setAlmacen(value);
    onFilterChange(escalaPrecio, value, precioObsequio ? '1' : '0');
  };

  const handlePrecioObsequioChange = (checked) => {
    setPrecioObsequio(checked);
    onFilterChange(escalaPrecio, almacen, checked ? '1' : '0');
  };

  return (
    <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row align-items-end">
        <div className="col-12 col-md-5">
          <label htmlFor="nombre" className="label-spacing">Escala de Precios</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={escalaPrecio}
            onChange={handleEscalaPrecioChange}
          />
        </div>
        <div className="col-12 col-md-5">
          <label htmlFor="marca" className="label-spacing">Almacén</label>
          <Select
            style={{ width: 350 }}
            showSearch
            placeholder="Selecciona un Almacén"
            value={almacen}
            onChange={handleAlmacenChange}
            className="w-100"
          >
            <Option value="Almacenes">Almacenes</Option>
            <Option value="Franquicias">Franquicias</Option>
          </Select>
        </div>
        <div className="col-12 col-md-5">
          <label htmlFor="marca" className="label-spacing">Archivo con precio obsequio</label>
          <CheckboxPerfiles checked={precioObsequio} onChange={handlePrecioObsequioChange} />
        </div>
      </div>
    </form>
  );
};

export default FiltrarBuscar;
