// src/components/BotonBuscar/BotonBuscar.jsx

import React from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
//import "./BotonBuscar.css";

const BotonMenu = ({ collapsed, toggleCollapsed }) => {
  return (
    <Button
      type="primary"
      onClick={toggleCollapsed}
      style={{ marginBottom: 16, backgroundColor: "#373738" }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  );
};

export default BotonMenu;
