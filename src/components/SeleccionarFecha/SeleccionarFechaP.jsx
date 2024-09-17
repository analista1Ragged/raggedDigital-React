import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Form, DatePicker } from 'antd';
import './SeleccionarFecha2.css';

const MyFormP = forwardRef(({ onDate1Change, onDate2Change }, ref) => {
  const [formState, setFormState] = useState({
    name: '',
    region: undefined,
    date1: undefined,
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  });

  // Función para manejar cambios
  const handleChange = (key, value) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));

    // Llamar a las funciones de callback con los valores actualizados
    if (key === 'date1' && onDate1Change) {
      onDate1Change(value);
    }
  };

  // Exponer la función para limpiar solo las fechas

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={formState}
    >
      <div >
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          
        >
          <DatePicker
            placeholder="Seleccione una fecha"
            value={formState.date1}
            onChange={(date) => handleChange('date1', date)}
            className="date-picker"
          />
        </Form.Item>
      </div>
    </Form>
  );
});

export default MyFormP;