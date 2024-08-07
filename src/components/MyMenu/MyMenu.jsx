import "./MyMenu.css";
import React, { useState, useRef, useEffect } from "react";
import { Menu, Button } from "antd";
import "antd/dist/reset.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FaHome, FaChartBar, FaShoppingCart, FaSignOutAlt, FaBars, FaCalculator, FaMoneyBill } from "react-icons/fa";
import { AiOutlineDollar, AiOutlineAppstore, AiOutlineEllipsis, AiOutlineHome, AiOutlineShrink, AiOutlineSearch } from "react-icons/ai";
import { IoAccessibilityOutline, IoCubeOutline, IoSettingsOutline, IoShirtSharp, IoReceiptOutline, IoClipboardSharp, IoIdCard } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import ModalCartera from "../ModalMenu/ModalMenu";

const { SubMenu } = Menu;

const menuItems = [
  {
    key: "0",
    title: "Ocultar",
    icon: <PiEyeSlashFill />,
    action: 'hideMenu',
  },
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
        title: "RagStyle",
        icon: <AiOutlineHome />,
        items: [
          {
            key: '3.2.1',
            title: 'Consulta Cartera',
            icon: <FaMoneyBill />,
            path: "/Mercadeo/Raqstyle/Cartera",
            items: [{ key: '2.1.1', title: 'Option 2.1.1' }],
          },
        ],
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
  const [hidden, setHidden] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 60, left: 0 });
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (event) => {
      if (isDragging.current) {
        setMenuPosition((prevPosition) => ({
          left: event.clientX - offset.current.x,
          top: event.clientY - offset.current.y,
        }));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setHidden(false);
    if (!collapsed) {
      setOpenKeys([]);
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('log');
    navigate('/Login');
  };

  const handleHideMenu = () => {
    setHidden(true);
  };

  const handleMenuItemClick = (action) => {
    if (action === 'hideMenu') {
      handleHideMenu();
    } else if (action === 'showModal') {
      setModal1Visible(true);
    }
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    offset.current = {
      x: event.clientX - menuPosition.left,
      y: event.clientY - menuPosition.top,
    };
  };

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ 
          marginBottom: 16, 
          backgroundColor: "#373738", 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          zIndex: 1002 
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {!hidden && (
        <div 
          className="custom-menu" 
          ref={menuRef} 
          style={{ 
            position: 'absolute', 
            top: menuPosition.top, 
            left: menuPosition.left, 
            width: '300px', 
            padding: '5px', 
            zIndex: 1000 
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Zona de 150px de ancho donde se muestra el cursor move */}
          <div 
            className="move-cursor-area" 
            style={{ 
              position: 'absolute', 
              width: '150px', 
              height: '100%', 
              top: 0, 
              left: 0, 
              cursor: 'move' 
            }}
          ></div>
          
          {/* Zona restante donde no se bloquea la interacción */}
          <div 
            className="rest-menu-area" 
            style={{ 
              position: 'absolute', 
              width: '150px', 
              height: '100%', 
              top: 0, 
              left: '150px', 
              pointerEvents: 'none' 
            }}
          ></div>
  
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            style={{ backgroundColor: "#373738", fontSize: "16px" }}
          >
            <NavLink to="/Home">
              <img src={require("../../assets/Images/logo.png")} alt="logo" />
            </NavLink>
            {menuItems.map((item) =>
              !item.items ? (
                <Menu.Item 
                  key={item.key} 
                  icon={item.icon}
                  onClick={() => handleMenuItemClick(item.action)}
                >
                  {item.title === "Logout" ? (
                    <div onClick={handleLogout}>
                      <NavLink to={item.path}>
                        {item.title}
                      </NavLink>
                    </div>
                  ) : (
                    <NavLink to={item.path}>
                      {item.title}
                    </NavLink>
                  )}
                </Menu.Item>
              ) : (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {item.items.map((subItem) =>
                    !subItem.items ? (
                      <Menu.Item key={subItem.key} icon={subItem.icon}>
                        <NavLink to={subItem.path}>
                          {subItem.title}
                        </NavLink>
                      </Menu.Item>
                    ) : (
                      <SubMenu key={subItem.key} icon={subItem.icon} title={subItem.title}>
                        {subItem.items.map((subSubItem) => (
                          <Menu.Item key={subSubItem.key} icon={subSubItem.icon}>
                            <NavLink to={subSubItem.path}>
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
          <ModalCartera modal1Visible={modal1Visible} setModal1Visible={setModal1Visible} />
        </div>
      )}
    </>
  );
};

export default MyMenu;

