import React from 'react';
import "./BotonGenerar.css";

const BotonGenerar = ({ onClick, iconClassName, title }) => {
  return (
    <button
      id="btnBuscar"
      className="botonGenerar-mt-3 botonGenerar-btn botonGenerar-btn-secondary botonGenerar-bold botonGenerar-rounded-circle"
      type="button"
      onClick={onClick}
      title={title} // Aquí se utiliza la variable title
    >
      <i className={iconClassName} style={{ fontSize: 'larger' }}></i>
    </button>
  );
};

export default BotonGenerar;


