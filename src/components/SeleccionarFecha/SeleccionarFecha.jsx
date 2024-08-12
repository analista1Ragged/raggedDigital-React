import React, { useState } from 'react';
import { Form, DatePicker } from 'antd';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px'  }}>
        <Form.Item
          //label="Fecha Inicial"
          labelCol={{ span: 6 }} // Ajusta el tamaño del label
          wrapperCol={{ span: 18 }} // Ajusta el tamaño del contenedor del DatePicker
          style={{ marginRight: '50px' }} // Agrega margen derecho entre campos de fecha
        >
          <DatePicker
            placeholder="Fecha Inicial"
            onChange={(date) => handleChange('date1', date)}
            style={{ width: '300px' }} // Establece un ancho específico
          />
        </Form.Item>

        <Form.Item
          //label="Fecha Final"
          labelCol={{ span: 6 }} // Ajusta el tamaño del label
          wrapperCol={{ span: 18 }} // Ajusta el tamaño del contenedor del DatePicker
        >
          <DatePicker
            placeholder="Fecha Final"
            onChange={(date) => handleChange('date2', date)}
            style={{ width: '300px' }} // Establece un ancho específico
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default MyForm;



