import React, { useState } from 'react';
import { Form, DatePicker, Switch, Checkbox,} from 'antd';
//import moment from 'moment';


const CheckboxForm = () => {
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
      <Form.Item label="Instant delivery">
        <Switch checked={formState.delivery} onChange={(checked) => handleChange('delivery', checked)} />
      </Form.Item>
    </Form>
  );
};

export default CheckboxForm;
