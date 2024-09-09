// CampoTexto.js
import React from 'react';
import './CampoTexto.css';

const CampoTexto = ({ id, value, onChange, placeholder }) => {
    return (
      <div className="campo-texto2">
        <input
            type="email"
            id={id}
            value={value}
            onChange={onChange}  // Asegúrate de que el onChange se está ejecutando
            placeholder={placeholder}
            required
        />
      </div>
    );
};
export default CampoTexto;

{/*
  import React, { useState } from 'react';
import './CampoTexto.css';

const CampoTexto = ({ placeholder = 'Escribe aquí...', titulo, tipo = 'text', onValorCambio }) => {
  const [valor, setValor] = useState('');

  const manejarCambio = (e) => {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);
    if (onValorCambio) {
      onValorCambio(nuevoValor);
    }
  };

  return (
    <div className="campo-texto2">
      <label>{titulo}</label>
      <input
        placeholder={placeholder}
        value={valor}
        onChange={manejarCambio}
        type={tipo}
      />
    </div>
  );
};

export default CampoTexto;
*/}