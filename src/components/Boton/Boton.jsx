import React from 'react';
import "./Boton.css";

const Boton = ({ onClick, children, disabled }) => {
  return (
    <button
      className={`boton ${disabled ? 'boton--disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled} // Esto deshabilita el botón en HTML
    >
      {children}
    </button>
  );
};

export default Boton;

