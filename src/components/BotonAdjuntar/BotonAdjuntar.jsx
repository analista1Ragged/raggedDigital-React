import React from 'react';
import "./BotonAdjuntar.css"

const BotonAdjuntar = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="boton">
      {children}
    </button>
  );
};

export default BotonAdjuntar;