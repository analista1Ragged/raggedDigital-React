import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';

import {
  FaHome,
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaCalculator
} from 'react-icons/fa';

const { SubMenu } = Menu;

const menuItems = [
  {
    key: '1',
    title: 'Inicio',
    icon: <FaHome />,
  },
  {
    key: '2',
    title: 'BI Analitycs',
    children: [
      {
        key: '2.1',
        title: 'Reporte PB',
        //children: [{ key: '2.1.1', title: 'Option 2.1.1' }], esto es el tercer nivel se deja comeentado por si se tiene que llegar a usar
      },
    ],
  },
  {
    key: '3',
    title: 'Ccial & Mercadeo',
    icon: <FaShoppingCart />,
    children: [
      {
        key: '3.1',
        title: 'Tiendas',
        icon: <FaShoppingCart />,
      },
      {
        key: '3.1',
        title: 'RaqStyle',
      },
      {
        key: '3.1',
        title: 'Ecommerce',
      },
      {
        key: '3.1',
        title: 'Venta Directa',
      },
      {
        key: '3.1',
        title: 'Otros',
      },
      {
        key: '3.1',
        title: 'Consultas',
      },
    ],
  },
  {
    key: '4',
    title: 'Compras',
    /*children: [
      {
        key: '4.1',
        title: 'Navigation 3', //tercer nivel
        children: [{ key: '4.1.1', title: 'Option 2.1.1' }],
      },
    ],*/
  },
  {
    key: '5',
    title: 'Diseño & Dllo Productos',
    children: [
      {
        key: '5.1',
        title: 'Productos',
        //children: [{ key: '2.1.1', title: 'Option 2.1.1' }], esto es el tercer nivel se deja comeentado por si se tiene que llegar a usar
      },
    ],
  },
  {
    key: '6',
    title: 'Talento Humano',
  },
  {
    key: '7',
    title: 'Financiero',
    children: [
      {
        key: '7.1',
        title: 'Planos',
        //children: [{ key: '2.1.1', title: 'Option 2.1.1' }], esto es el tercer nivel se deja comeentado por si se tiene que llegar a usar
      },
      {
        key: '7.1',
        title: 'Bancos',
        //children: [{ key: '2.1.1', title: 'Option 2.1.1' }], esto es el tercer nivel se deja comeentado por si se tiene que llegar a usar
      },
    ],
  },
  {
    key: '8',
    title: 'Inventarios',
  },
  {
    key: '9',
    title: 'Manofactura',
  },

];

const MyMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        //defaultSelectedKeys={['1']}
        //defaultOpenKeys={['2']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{ backgroundColor: '#373738' }} // Aquí se establece el color de fondo
      >
        {menuItems.map(item => (
          !item.children ? (
            <Menu.Item key={item.key} icon={<FaHome />}>
              {item.title}
            </Menu.Item>
          ) : (
            <SubMenu key={item.key} icon={<FaChartBar />} title={item.title}>
              {item.children.map(subItem => (
                !subItem.children ? (
                  <Menu.Item key={subItem.key} icon={<FaChartBar />}>
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
