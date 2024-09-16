import React, { useState } from 'react';

const CheckboxPerfiles = ({ checked, onChange }) => {
  const handleChange = (event) => {
    // Llama a la función onChange con el nuevo valor del checkbox
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
};

// Uso del componente
const App = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newChecked) => {
    setIsChecked(newChecked);
  };

  return (
    <div>
      <CheckboxPerfiles checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
};

export default CheckboxPerfiles;
