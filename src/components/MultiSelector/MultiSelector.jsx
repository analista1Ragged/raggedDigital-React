import React, { useState } from 'react';
import { Select, Space } from 'antd';
import './MultiSelector.css';

const { Option } = Select;

const MultiSelector = ({ placeholder }) => {
  const [value, setValue] = useState([]);

  const options = [
    { value: 'opcion1', label: 'opcion1'},
    { value: 'opcion2', label: 'opcion2'},
    { value: 'opcion3', label: 'opcion3'},
    { value: 'opcion4', label: 'opcion4'},
  ];

  const handleChange = (selectedValues) => {
    console.log('selected:', selectedValues);
    setValue(selectedValues);
  };

  return (
    <Space direction="vertical" style={{ width: '30%', padding: '30px' }}>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        optionLabelProp="label"
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value} label={option.label}>
            <span role="img" aria-label={option.label}>{option.icon}</span>
            &nbsp;&nbsp;{option.label}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default MultiSelector;

