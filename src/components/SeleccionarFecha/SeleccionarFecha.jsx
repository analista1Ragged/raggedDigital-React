import React, { useState } from 'react';
import { Form, DatePicker } from 'antd';
import './SeleccionarFecha.css';

const MyForm = ({ onDate1Change, onDate2Change }) => {
  const [formState, setFormState] = useState({
    name: '',
    region: undefined,
    date1: undefined,
    date2: undefined,
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  });

  const handleChange = (key, value) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));

    // Llamar a las funciones de callback con los valores actualizados
    if (key === 'date1' && onDate1Change) {
      onDate1Change(value);
    }
    if (key === 'date2' && onDate2Change) {
      onDate2Change(value);
    }
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={formState}
    >
      <div className="form-dates-container">
        <Form.Item
          //label="Fecha Inicial"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          className="form-item"
        >
          <DatePicker
            placeholder="Fecha Inicial"
            onChange={(date) => handleChange('date1', date)}
            className="date-picker"
          />
        </Form.Item>

        <Form.Item
          //label="Fecha Final"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          className="form-item"
        >
          <DatePicker
            placeholder="Fecha Final"
            onChange={(date) => handleChange('date2', date)}
            className="date-picker"
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default MyForm;




