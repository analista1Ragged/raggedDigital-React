import React from 'react';
import "./FiltrarBuscar.css";
import BuscarButton from "../BotonBuscar/BotonBuscar";
import BotonLimpiar from '../BotonLimpiar/BotonLimpiar';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import CheckboxPerfiles from '../CheckboxPefiles/CheckboxPerfiles';

const { Option } = Select;

const FiltrarBuscar = () => {
  return (
    <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row align-items-end">
    
        <div className="col-12 col-md-5">
          <label htmlFor="nombre" className="label-spacing">Escala de Precios</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder=""
          />
        </div>
        <div className="col-12 col-md-5">
          <label htmlFor="marca" className="label-spacing">Almacén</label>
          <div>
            <Select
              style={{ width: 350 }}
              showSearch
              placeholder="Selecciona una Almacén"
              className="w-100"
            >
              {/* Opciones de ejemplo */}
              <Option value="capsula1">Almacenes</Option>
              <Option value="capsula1">Franquicias</Option>
            </Select>
          </div>
        </div>
        <div className="col-12 col-md-5">
            <label htmlFor="marca" className="label-spacing">Archivo con precio obsequio</label>
            <CheckboxPerfiles checked={true}/>
        </div>
      </div>
    </form>
  );
};

export default FiltrarBuscar;
