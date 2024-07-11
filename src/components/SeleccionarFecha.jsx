import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Switch, Checkbox, Radio, Button } from 'antd';
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

  const onSubmit = () => {
    console.log('submit!', formState);
  };

  const handleChange = (key, value) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} initialValues={formState}>
      <Form.Item label="Activity name">
        <Input value={formState.name} onChange={(e) => handleChange('name', e.target.value)} />
      </Form.Item>
      <Form.Item label="Activity zone">
        <Select
          value={formState.region}
          placeholder="please select your zone"
          onChange={(value) => handleChange('region', value)}
        >
          <Option value="shanghai">Zone one</Option>
          <Option value="beijing">Zone two</Option>
        </Select>
      </Form.Item>
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
      <Form.Item label="Activity type">
        <Checkbox.Group value={formState.type} onChange={(checkedValues) => handleChange('type', checkedValues)}>
          <Checkbox value="1" name="type">Online</Checkbox>
          <Checkbox value="2" name="type">Promotion</Checkbox>
          <Checkbox value="3" name="type">Offline</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Resources">
        <Radio.Group value={formState.resource} onChange={(e) => handleChange('resource', e.target.value)}>
          <Radio value="1">Sponsor</Radio>
          <Radio value="2">Venue</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Activity form">
        <TextArea value={formState.desc} onChange={(e) => handleChange('desc', e.target.value)} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={onSubmit}>Create</Button>
        <Button style={{ marginLeft: 10 }}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
