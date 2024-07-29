import React from 'react';
import './CampoTexto.css';

const CampoContraseña = (props) => {
  const placeholderModificado = props.placeholder || 'Escribe aquí...'; // Valor predeterminado para placeholder

  const manejarCambio = (e) => {
    props.actualizarValor(e.target.value);
  };

  return (
    <div className="campo-texto">
      <label>{props.titulo}</label>
      <input
        type={props.tipo || 'password'} // Asegura que el tipo sea 'password' para ocultar la entrada
        placeholder={placeholderModificado}
        required={props.required}
        value={props.valor || ''} // Enlaza el valor al estado y permite que se borre
        onChange={manejarCambio}
      />
    </div>
  );
};

export default CampoContraseña;