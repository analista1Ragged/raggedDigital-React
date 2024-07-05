import React, { useState, useRef, useEffect } from 'react';
import {
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaCalculator
  
} from 'react-icons/fa';

import { 
  IoAccessibilityOutline, 
  IoCubeOutline, 
  IoSettingsOutline, 
  IoShirtSharp, 
  IoReceiptOutline, 
  IoClipboardSharp,
  IoIdCard, 

} from "react-icons/io5";

import { NavLink } from "react-router-dom";
import "../style/navbar.css";
import { Menu, Button } from 'antd';


const ICON_SIZE = 20;

function Navbar({ visible, show }) {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef();
  const pageTopRef = useRef(); // Referencia al inicio de la página
  //const history = useHistory();

  const handleLogout = () => {
    // Limpiar datos de sesión (localStorage, cookies, etc.)
    localStorage.removeItem('authToken'); // Ejemplo para token de autenticación en localStorage
    <NavLink to="/" className="nav-link"></NavLink>
    // Redireccionar a la página de login
    //history.push('/login');
  };

  const toggleMenu = (menu) => {
    if (openMenu === menu) {
      setOpenMenu(null); // Cerrar si el mismo menú está abierto
    } else {
      setOpenMenu(menu); // Abrir el nuevo menú
    }
  };

  const handleSidebarToggle = () => {
    const newVisibility = !visible;
    show(newVisibility);
    setOpenMenu(null); // Cerrar todos los menús al ocultar la barra lateral - no

    // Scroll al inicio de la página al expandir la barra lateral - no
    if (newVisibility) {
      pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    setOpenMenu(null); // Contraer todos los submenús al hacer clic en Inicio - no
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      show(false);
      setOpenMenu(null); // Cerrar todos los menús - no
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className="mobile-nav">
        <button
          className="mobile-nav-btn"
          onClick={handleSidebarToggle}
        >
          <FaBars size={24} />
        </button>
      </div>
      <nav ref={navRef} className={!visible ? 'navbar' : ''}>
        <button
          type="button"
          className="nav-btn"
          onClick={handleSidebarToggle}
        >
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>
        <div>
          <NavLink className="logo" to="/">
            <img
              src={require("../assets/Images/Logo.png")}
              alt="logo"
            />
          </NavLink>
          <div className="links nav-top">
            <div className="nav-item">
              <NavLink to="/Home" className="nav-link" onClick={handleHomeClick}>
                <FaHome size={ICON_SIZE} />
                <span>Inicio</span>
                <span style={{ width: ICON_SIZE, display: 'inline-block' }}></span>
              </NavLink>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('analytics')}>
                <FaChartBar size={ICON_SIZE} />
                <span>BI Analytics</span>
                {openMenu === 'analytics' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
              {openMenu === 'analytics' && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/analytics/Reporte" className="nav-link">Reporte PB</NavLink>
                  </li>
                </ul>
              )}
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('ecommerce')}>
                <FaShoppingCart size={ICON_SIZE} />
                <span>Ccial & Mercadeo</span>
                {openMenu === 'ecommerce' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
              {openMenu === 'ecommerce' && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/Settings" className="nav-link">Tiendas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Settings" className="nav-link">RaqStyle</NavLink>
                  </li>
                  <li>
                    <NavLink to="/ecommerce/VerCapsulas" className="nav-link">Ecommerce</NavLink>
                  </li>                  <li>
                    <NavLink to="/Settings" className="nav-link">Venta Directa</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Settings" className="nav-link">Otros</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Settings" className="nav-link">Consultas</NavLink>
                  </li>
                </ul>
              )}
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('compras')}>
                <FaChartBar size={ICON_SIZE} />
                <span>Compras</span>
                {openMenu === 'compras' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('dlloProducto')}>
                <FaChartBar size={ICON_SIZE} />
                <span>Diseño & Dllo Productos</span>
                {openMenu === 'dlloProducto' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('talentoHumano')}>
                <FaChartBar size={ICON_SIZE} />
                <span>Talento Humano</span>
                {openMenu === 'talentoHumano' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('Financiero')}>
                <FaCalculator size={ICON_SIZE} />
                <span>Financiero</span>
                {openMenu === 'Financiero' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
              {openMenu === 'Financiero' && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/contabilidad/Planos" className="nav-link">Planos</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contabilidad/Bancos" className="nav-link">Bancos</NavLink>
                  </li>
                </ul>
              )}
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('inventarios')}>
                <IoClipboardSharp size={ICON_SIZE} />
                <span>Inventarios</span>
                {openMenu === 'Inventarios' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('manofactura')}>
                <FaChartBar size={ICON_SIZE} />
                <span>Manofactura</span>
                {openMenu === 'manofactura' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('settings')}>
                <FaChartBar size={ICON_SIZE} />
                <span>Settings</span>
                {openMenu === 'settings' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('admonMaestra')}>
                <IoIdCard size={ICON_SIZE} />
                <span>Administración Maestra</span>
                {openMenu === 'settings' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
            </div>
          </div>
        </div>
        <div className="links">
          <NavLink to="/" className="nav-link" onClick={handleLogout}>
            <FaSignOutAlt size={ICON_SIZE} />
            <span>Logout</span>
            <span style={{ width: ICON_SIZE, display: 'inline-block' }}>&nbsp;</span>
          </NavLink>
        </div>
      </nav>
      {/* Referencia al inicio de la página */}
      <div ref={pageTopRef} />
    </>
  );
}

export default Navbar;



