// CheckboxGroup.js
import React, { useState } from 'react';

const CheckboxGroup = ({ items, onCheckboxChange }) => {
  const [checkedItems, setCheckedItems] = useState({}); // Mapa para manejar el estado de los checkboxes

  const handleChange = (id) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [id]: !checkedItems[id], // Cambia el estado del checkbox correspondiente
    };
    setCheckedItems(updatedCheckedItems);
    onCheckboxChange(updatedCheckedItems); // Llama a la función de callback
  };

  if (!Array.isArray(items) || items.length === 0) {
    return <p>No items available</p>; // Renderiza un mensaje si no hay items o si es indefinido
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={!!checkedItems[item.id]} // Verifica si el checkbox está marcado
            onChange={() => handleChange(item.id)} // Maneja el cambio
          />
          {item.pedidoVtex} {/* Muestra el nombre del pedido, ajusta según necesites */}
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
