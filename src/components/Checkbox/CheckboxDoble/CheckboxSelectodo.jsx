// CheckboxSelectodo.js
import React from 'react';

const CheckboxSelectodo = ({ isChecked, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default CheckboxSelectodo;
