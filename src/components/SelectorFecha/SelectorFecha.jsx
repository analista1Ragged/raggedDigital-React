import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Switch} from 'antd';
//import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

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
      <Form.Item label="Fecha de generación">
        <DatePicker
          showTime
          //value={formState.date1 ? moment(formState.date1) : null}
          placeholder="Pick a date"
          onChange={(date) => handleChange('date1', date)}
          style={{ width: '30%' }}
        />
      </Form.Item>
      <Form.Item label="Instant delivery">
        <Switch checked={formState.delivery} onChange={(checked) => handleChange('delivery', checked)} />
      </Form.Item>

    </Form>
  );
};

export default MyForm;
