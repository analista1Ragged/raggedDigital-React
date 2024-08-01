import React, { useState } from 'react';
import { Form, DatePicker } from 'antd';

const MyForm = () => {
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
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={formState}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px'  }}>
        <Form.Item
          label="Fecha Inicial"
          labelCol={{ span: 6 }} // Ajusta el tamaño del label
          wrapperCol={{ span: 18 }} // Ajusta el tamaño del contenedor del DatePicker
          style={{ marginRight: '16px' }} // Agrega margen derecho
        >
          <DatePicker
            placeholder="Fecha Inicial"
            onChange={(date) => handleChange('date1', date)}
            style={{ width: '180px' }} // Establece un ancho específico
          />
        </Form.Item>

        <Form.Item
          label="Fecha Final"
          labelCol={{ span: 6 }} // Ajusta el tamaño del label
          wrapperCol={{ span: 18 }} // Ajusta el tamaño del contenedor del DatePicker
        >
          <DatePicker
            placeholder="Fecha Final"
            onChange={(date) => handleChange('date2', date)}
            style={{ width: '180px' }} // Establece un ancho específico
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default MyForm;



