import React from 'react';
import "./BotonLimpiar.css";

const BuscarLimpiar = ({ onClick }) => {
  return (
    <button
      id="btnLimpiar"
      className="mt-3 btn btn-secondary btn bold rounded-circle"
      type="button"
      onClick={onClick}
      title='Limpiar Campos'
    >
      <i className="bi bi-eraser-fill" style={{ fontSize: 'larger' }}></i>
    </button>
  );
};

export default BuscarLimpiar;
