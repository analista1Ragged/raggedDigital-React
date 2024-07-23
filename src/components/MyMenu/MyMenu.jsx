import "./MyMenu.css";
import React, { useState, useRef, useEffect } from "react";
import { Menu, Button } from "antd";
import "antd/dist/reset.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { FaHome, FaChartBar, FaShoppingCart, FaSignOutAlt, FaBars, FaCalculator } from "react-icons/fa";
import { IoAccessibilityOutline, IoCubeOutline, IoSettingsOutline, IoShirtSharp, IoReceiptOutline, IoClipboardSharp, IoIdCard } from "react-icons/io5";
import { AiOutlineDollar, AiOutlineAppstore, AiOutlineEllipsis, AiOutlineHome, AiOutlineShrink, AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

const menuItems = [
  {
    key: "1",
    title: "Inicio",
    icon: <FaHome />,
    path: "/Home",
  },
  {
    key: "2",
    title: "BI Analitycs",
    icon: <FaChartBar />,
    items: [
      {
        key: "2.1",
        title: "Reporte PB",
        icon: <FaChartBar />,
        path: "/analytics/Reporte",
      },
    ],
  },
  {
    key: "3",
    title: "Ccial & Mercadeo",
    icon: <FaShoppingCart />,
    items: [
      {
        key: "3.1",
        title: "Tiendas",
        icon: <AiOutlineAppstore />,
        path: "/ecommerce/Ragged",
      },
      {
        key: "3.2",
        title: "RaqStyle",
        icon: <AiOutlineHome />,
        path: "/ecommerce/Ragged",
      },
      {
        key: "3.3",
        title: "Ecommerce",
        icon: <FaShoppingCart />,
        path: "/ecommerce/VerCapsulas",
      },
      {
        key: "3.4",
        title: "Venta Directa",
        icon: <AiOutlineShrink />,
        path: "/ecommerce/Ragged",
      },
      {
        key: "3.5",
        title: "Otros",
        icon: <AiOutlineEllipsis />,
        path: "/ecommerce/Ragged",
      },
      {
        key: "3.6",
        title: "Consultas",
        icon: <AiOutlineSearch />,
        path: "/ecommerce/Ragged",
      },
    ],
  },
  {
    key: "4",
    title: "Compras",
    icon: <IoReceiptOutline />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "5",
    title: "Diseño & Dllo Productos",
    icon: <IoShirtSharp />,
    items: [
      {
        key: "5.1",
        title: "Productos",
        icon: <IoShirtSharp />,
        path: "/ecommerce/Ragged",
      },
    ],
  },
  {
    key: "6",
    title: "Talento Humano",
    icon: <IoAccessibilityOutline />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "7",
    title: "Financiero",
    icon: <FaCalculator />,
    items: [
      {
        key: "7.1",
        title: "Planos",
        icon: <FaBars />,
        path: "/ecommerce/Ragged",
      },
      {
        key: "7.2",
        title: "Bancos",
        icon: <AiOutlineDollar />,
        path: "/contabilidad/Bancos",
      },
    ],
  },
  {
    key: "8",
    title: "Inventarios",
    icon: <IoClipboardSharp />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "9",
    title: "Manufactura",
    icon: <IoCubeOutline />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "10",
    title: "Settings",
    icon: <IoSettingsOutline />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "11",
    title: "Administración Maestra",
    icon: <IoIdCard />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "12",
    title: "Logout",
    icon: <FaSignOutAlt />,
    path: "/",
    onClick: 'handleLogout',
  },
];

const MyMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setOpenKeys([]);
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleLogout = () => {
    // Borrar la variable 'log' del sessionStorage
    sessionStorage.removeItem('log');
    
    // Redirigir a la página de login
    navigate('/Login');
  };

  return (
    <div ref={menuRef} className={`custom-menu ${collapsed ? 'collapsed' : ''}`}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, backgroundColor: "#373738" }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ backgroundColor: "#373738", fontSize: "16px" }}
      >
        <NavLink to="/Home">
          <img src={require("../../assets/Images/Logo.png")} alt="logo" />
        </NavLink>
        {menuItems.map((item) =>
          !item.items ? (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.title === "Logout" ? (
                <div onClick={handleLogout}>
                  <NavLink to={item.path} exact activeClassName="ant-menu-item-selected">
                    {item.title}
                  </NavLink>
                </div>
              ) : (
                <NavLink to={item.path} exact activeClassName="ant-menu-item-selected">
                  {item.title}
                </NavLink>
              )}
            </Menu.Item>
          ) : (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {item.items.map((subItem) =>
                !subItem.items ? (
                  <Menu.Item key={subItem.key} icon={subItem.icon}>
                    <NavLink to={subItem.path} exact activeClassName="ant-menu-item-selected">
                      {subItem.title}
                    </NavLink>
                  </Menu.Item>
                ) : (
                  <SubMenu key={subItem.key} icon={subItem.icon} title={subItem.title}>
                    {subItem.items.map((subSubItem) => (
                      <Menu.Item key={subSubItem.key} icon={subSubItem.icon}>
                        <NavLink to={subSubItem.path} exact activeClassName="ant-menu-item-selected">
                          {subSubItem.title}
                        </NavLink>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                )
              )}
            </SubMenu>
          )
        )}
      </Menu>
    </div>
  );
};

export default MyMenu;
