// CheckboxGroup.js
import React from 'react';

const CheckboxGroup = ({ items, selectedItems, onChange }) => {
  return (
    <div>
      {items.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={item}
            checked={selectedItems.includes(item)}
            onChange={() => onChange(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;








