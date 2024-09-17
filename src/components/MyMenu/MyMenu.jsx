import "./MyMenu.css";
import React, { useState, useRef, useEffect } from "react";
import { Menu, Button } from "antd";
import "antd/dist/reset.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FaHome, FaChartBar, FaShoppingCart, FaSignOutAlt, FaBars, FaCalculator, FaMoneyBill, FaCheck,  FaUsers} from "react-icons/fa";
import { AiOutlineDollar, AiOutlineAppstore, AiOutlineEllipsis, AiOutlineHome, AiOutlineShrink, AiOutlineSearch } from "react-icons/ai";
import { IoAccessibilityOutline, IoCubeOutline, IoSettingsOutline, IoShirtSharp, IoReceiptOutline, IoClipboardSharp, IoIdCard } from "react-icons/io5";
import { PiEyeSlashFill, PiPasswordFill, PiUsersFill } from "react-icons/pi";
import { FaUsersRays } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

const authArray = JSON.parse(sessionStorage.getItem('auth')) || [];


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
            //items: [{ key: '2.1.1', title: 'Option 2.1.1' }],
          },
          {
            key: '3.2.2',
            title: 'Inventario Disponible',
            icon: <FaCheck />,
            path: "/Mercadeo/Raqstyle/Inventario",
            //items: [{ key: '2.1.2', title: 'Option 2.1.2' }],
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
    items: [
        {
          key: "6.1",
          title: "Nómina",
          icon: <FaUsers />,
          items: [
            {
              key: '6.1.1',
              title: 'Nómina Electrónica',
              icon: <FaUsersRays />,
              path: "/TalentoHumano/Nomina/NominaElectronica",
              //items: [{ key: '2.1.1', title: 'Option 2.1.1' }],
            },
          ],
        },
     ],
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
    key: "96",
    title: "Cambiar Contraseña",
    icon: <PiPasswordFill />,
    path: "/CambiarContraseña",
  },
  {
    key: "97",
    title: "Administración Maestra",
    icon: <IoIdCard />,

    items: [
      {
        key: "97.1",
        title: "Perfiles",
        icon: <PiUsersFill />,
        path: "/AdministracionMaestras/Perfiles",
      },
    ],
  },
 
  {
    key: "98",
    title: "Configuración",
    icon: <IoSettingsOutline />,
    path: "/ecommerce/Ragged",
  },
  {
    key: "99",
    title: "Cerrar Sesión",
    icon: <FaSignOutAlt />,
    path: "/",
    onClick: 'handleLogout',
  },
];

const filterMenuItems = (items, authArray) => {
  return items
    .filter((item) => authArray.includes(item.key))
    .map((item) => {
      if (item.items) {
        return {
          ...item,
          items: filterMenuItems(item.items, authArray),
        };
      }
      return item;
    });
};

const filteredMenuItems = filterMenuItems(menuItems, authArray);

const MyMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHidden(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleCollapsed = () => {
    //setCollapsed(!collapsed); esta linea muestra el menu contraido
    setHidden(false);
    if (!collapsed) {
      setOpenKeys([]);
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleLogout = () => {
    console.log('melo')
    sessionStorage.removeItem("log");
    sessionStorage.removeItem("auth");
    navigate("/Login");
  };

  const handleHideMenu = () => {
    setHidden(true);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          backgroundColor: "#373738",
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1002,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {!hidden && (
        <div
          ref={menuRef}
          className={`custom-menu ${collapsed ? "collapsed" : ""}`}
          style={{
            position: "absolute",
            top: 60,
            left: 0,
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            style={{ backgroundColor: "#373738", fontSize: "16px" }}
          >
            <NavLink to="/Home">
              <img src={require("../../assets/Images/logo.png")} alt="logo" className="logo"/>
            </NavLink>
            {filteredMenuItems.map((item) =>
              item.items ? (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {item.items.map((subItem) =>
                    subItem.items ? (
                      <SubMenu key={subItem.key} icon={subItem.icon} title={subItem.title}>
                        {subItem.items.map((subSubItem) => (
                          <Menu.Item key={subSubItem.key} icon={subSubItem.icon}>
                            <NavLink to={subSubItem.path}>{subSubItem.title}</NavLink>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    ) : (
                      <Menu.Item key={subItem.key} icon={subItem.icon}>
                        <NavLink to={subItem.path}>{subItem.title}</NavLink>
                      </Menu.Item>
                    )
                  )}
                </SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleHideMenu()}
                >
                  {item.title === "Cerrar Sesión" ? (
                    <div onClick={handleLogout}>
                      <NavLink to={item.path}>{item.title}</NavLink>
                    </div>
                  ) : (
                    <NavLink to={item.path}>{item.title}</NavLink>
                  )}
                </Menu.Item>
              )
            )}
          </Menu>
        </div>
      )}
    </>
  );
};

export default MyMenu;

