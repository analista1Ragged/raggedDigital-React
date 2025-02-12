import React from 'react';
import "./BotonDescargar.css";

const BuscarButton = ({ onClick , disabled = false }) => {
  return (
    <button
      id="btnBuscar"
      className="mt-3 btn btn-secondary btn bold rounded-circle"
      type="button"
      onClick={onClick}
      disabled={disabled}
      title='Descargar Excel'
    >
      <i className="bi bi-cloud-download-fill" style={{ fontSize: 'larger' }}></i>
    </button>
  );
};

export default BuscarButton;