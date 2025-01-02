import React, { useState } from 'react';

// Componente CheckboxPerfiles
const CheckboxPerfiles = ({ checked, onChange }) => {
  const handleChange = (event) => {
    // Llama a la función onChange con el nuevo estado del checkbox
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={checked} // El valor depende de la prop `checked`
        onChange={handleChange} // Maneja los cambios al hacer clic
      />
    </label>
  );
};

// Componente principal App
const App = () => {
  const [isChecked, setIsChecked] = useState(true); // El checkbox viene marcado por defecto

  const handleCheckboxChange = (newChecked) => {
    setIsChecked(newChecked); // Actualiza el estado al hacer clic
  };

  return (
    <div>
      <CheckboxPerfiles checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
};

export default App;

