import React, { useState } from 'react';
import { Form, DatePicker, Switch,} from 'antd';
//import moment from 'moment';


const MyForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    region: undefined,
    date1: undefined,
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  });

  const handleChange = (key, value) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} initialValues={formState}>
      <Form.Item label="Fecha "
              labelCol={{ span: 6 }} // Ajusta el tamaño del label
              wrapperCol={{ span: 18 }} // Ajusta el tamaño del contenedor del DatePicker
              >
        <DatePicker
          //showTime para colocar la hora
          //value={formState.date1 ? moment(formState.date1) : null}
          placeholder="Fecha de Generación"
          onChange={(date) => handleChange('date1', date)}
          style={{ width: '150%' }}
        />
      </Form.Item>
    </Form>
  );
};

export default MyForm;
