import React from 'react';
import "./BotonBuscar.css";

const BuscarButton = ({ onClick }) => {
  return (
    <button
      id="btnBuscar"
      className="mt-3 btn btn-secondary btn bold rounded-circle"
      type="button"
      onClick={onClick}
      
    >
      <i className="bi bi-search" style={{ fontSize: 'larger' }}></i>
    </button>
  );
};

export default BuscarButton;


