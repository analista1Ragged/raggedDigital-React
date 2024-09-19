import React from 'react';
import "./BotonGenerar.css";

const BotonGenerar = ({ onClick }) => {
  return (
    <button
      id="btnBuscar"
      className="botonGenerar-mt-3 botonGenerar-btn botonGenerar-btn-secondary botonGenerar-bold botonGenerar-rounded-circle"
      type="button"
      onClick={onClick}
      title='Generar en Siesa'
    >
      <i className="bi-stripe botonGenerar-bi-search" style={{ fontSize: 'larger' }}></i>
    </button>
  );
};

export default BotonGenerar;
