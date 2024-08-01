import React from 'react';
import './CampoTexto.css';

const CampoNumber = (props) => {
  const placeholderModificado = props.placeholder || 'Escribe aquí...'; // Valor predeterminado para placeholder

  const manejarCambio = (e) => {
    // Asegura que se llame a la función de actualización del valor
    if (props.actualizarValor) {
      props.actualizarValor(e.target.value);
    }
  };

  return (
    <div className="campo-texto">
      <label>{props.titulo}</label>
      <input
        placeholder={placeholderModificado}
        required={props.required}
        value={props.valor || ''} // Asegura que siempre haya un valor (cadena vacía si es undefined)
        onChange={manejarCambio}
        type='number'
      />
    </div>
  );
};

export default CampoNumber;
