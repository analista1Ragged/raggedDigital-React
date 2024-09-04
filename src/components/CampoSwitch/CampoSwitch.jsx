import React, { useState } from 'react';
import { Switch } from 'antd';

const CampoSwitch = () => {
  const [checked, setChecked] = useState(false); // Estado para manejar el valor del switch

  const manejarCambio = (checked) => {
    setChecked(checked); // Actualiza el estado cuando cambia el switch
  };

  return (
    <div>
      <Switch 
      checked={checked} 
      onChange={manejarCambio}  
      />
    </div>
  );
};

export default CampoSwitch;
