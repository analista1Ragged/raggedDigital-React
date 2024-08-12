import React, { useState } from 'react';
import { Select, Space } from 'antd';
import './MultiSelector.css';

const { Option } = Select;

const MultiSelector = ({ options = [],opc, placeholder,onSelectChange }) => {
  const [value, setValue] = useState([]);

  const handleChange = (selectedValues) => {
    //console.log('selected:', selectedValues);
    setValue(selectedValues);

    // Llamar a la función de callback pasando los valores seleccionados
    if (onSelectChange) {
      onSelectChange(selectedValues);
    }
  };

  return (
    <Space className="space-container" direction="vertical">
      <Select
        mode="multiple"
        className="ant-select"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        optionLabelProp="label"
      >
        {options.map((option, index) => (
          <Option key={index} value={option[parseInt(opc)]} label={option[parseInt(opc)]}>
            {option[parseInt(opc)]}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default MultiSelector;
