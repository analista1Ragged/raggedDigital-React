import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; // Importamos los íconos de Ant Design
import './CampoTexto.css';

const CampoContraseña = (props) => {
  const [mostrarContraseña, setMostrarContraseña] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const placeholderModificado = props.placeholder || 'Escribe aquí...'; // Placeholder predeterminado

  const manejarCambio = (e) => {
    props.actualizarValor(e.target.value);
  };

  const alternarVisibilidadContraseña = () => {
    setMostrarContraseña(!mostrarContraseña); // Cambia entre mostrar y ocultar la contraseña
  };

  return (
    <div className="campo-texto">
      <label>{props.titulo}</label>
      <div className="campo-contraseña-contenedor">
        <input
          type={mostrarContraseña ? 'text' : 'password'} // Cambia el tipo de input entre 'text' y 'password'
          placeholder={placeholderModificado}
          required={props.required}
          value={props.valor || ''} // Enlaza el valor con el estado
          onChange={manejarCambio}
          className="input-contraseña"
        />
        {/* Ícono para mostrar/ocultar la contraseña */}
        <span onClick={alternarVisibilidadContraseña} className="icono-ojo">
          {mostrarContraseña ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
        </span>
      </div>
    </div>
  );
};

export default CampoContraseña;
