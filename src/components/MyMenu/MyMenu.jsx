import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const menuItems = [
  {
    key: '1',
    title: 'Inicio',
  },
  {
    key: '2',
    title: 'Navigation 2',
    children: [
      {
        key: '2.1',
        title: 'Navigation 3',
        children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
      },
    ],
  },
  {
    key: '1',
    title: 'Option 1',
  },
  {
    key: '2',
    title: 'Navigation 2',
    children: [
      {
        key: '2.1',
        title: 'Navigation 3',
        children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
      },
    ],
  },
  {
    key: '1',
    title: 'Option 1',
  },
  {
    key: '2',
    title: 'Navigation 2',
    children: [
      {
        key: '2.1',
        title: 'Navigation 3',
        children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
      },
    ],
  },
];

const MyMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }; //este

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['2']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {menuItems.map(item => (
          !item.children ? (
            <Menu.Item key={item.key} icon={<PieChartOutlined />}>
              {item.title}
            </Menu.Item>
          ) : (
            <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
              {item.children.map(subItem => (
                !subItem.children ? (
                  <Menu.Item key={subItem.key} icon={<PieChartOutlined />}>
                    {subItem.title}
                  </Menu.Item>
                ) : (
                  <SubMenu key={subItem.key} icon={<MailOutlined />} title={subItem.title}>
                    {subItem.children.map(subSubItem => (
                      <Menu.Item key={subSubItem.key} icon={<PieChartOutlined />}>
                        {subSubItem.title}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                )
              ))}
            </SubMenu>
          )
        ))}
      </Menu>
    </div>
  );
};

export default MyMenu;

