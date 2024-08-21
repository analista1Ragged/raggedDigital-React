import React from 'react';
import { Select, Space } from 'antd'; // Usa Select y Space de Ant Design
import './MultiSelector.css';

const { Option } = Select;

const MultiSelector = ({ options = [], opc, placeholder, value, onSelectChange }) => {
  // Esta función maneja los cambios en el MultiSelector
  const handleChange = (selectedValues) => {
    onSelectChange(selectedValues); // Actualiza el estado en el componente Tabla
  };


  return (
    <Space className="space-container" direction="vertical">
      <Select
        mode="multiple"
        className="ant-select"
        value={value} // Recibe el valor desde el componente Tabla
        onChange={handleChange} // Llama a handleChange cuando cambian las selecciones
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


