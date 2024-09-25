// CheckboxGroup.js
import React from 'react';

const CheckboxGroup = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No items available</p>; // Renderiza un mensaje si no hay items o si es indefinido
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <input type="checkbox" />
          <label>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;









