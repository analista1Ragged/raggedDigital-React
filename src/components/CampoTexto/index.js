import React from 'react';
import './CampoTexto.css';

const CampoTexto = (props) => {
  const placeholderModificado = props.placeholder || 'Escribe aquí...'; // Valor predeterminado para placeholder

  const manejarCambio = (e) => {
    props.actualizarValor(e.target.value);
  };

  return (
    <div className="campo-texto">
      <label>{props.titulo}</label>
      <input
        placeholder={placeholderModificado}
        required={props.required}
        value={props.valor || ''} // Asigna un valor vacío si props.valor es undefined
        onChange={manejarCambio}
      />
    </div>
  );
};

export default CampoTexto;
