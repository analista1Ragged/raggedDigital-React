import React from 'react';
import { Select, Space } from 'antd'; // Usa Select y Space de Ant Design
import './MultiSelector.css';

const { Option } = Select;

const MultiSelector = ({ 
  options = [],        // Lista de opciones para el selector
  opc,                 // Índice para acceder al valor en las opciones
  placeholder,         // Placeholder dinámico
  value,               // Valor seleccionado
  onSelectChange,      // Función para manejar cambios
  mode = "multiple"    // Modo dinámico: "multiple" o "single"
}) => {
  // Esta función maneja los cambios en el MultiSelector
  const handleChange = (selectedValues) => {
    onSelectChange(selectedValues); // Actualiza el estado en el componente Tabla
  };

  return (
    <Space className="space-container" direction="vertical">
      <Select
        mode={mode}              // Modo dinámico basado en la prop
        className="ant-select"
        value={value}            // Recibe el valor desde el componente Tabla
        onChange={handleChange}  // Llama a handleChange cuando cambian las selecciones
        placeholder={placeholder} 
        optionLabelProp="label"
      >
        {options.map((option, index) => (
          <Option 
            key={index} 
            value={option[parseInt(opc)]} 
            label={option[parseInt(opc)]}
          >
            {option[parseInt(opc)]}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default MultiSelector;



