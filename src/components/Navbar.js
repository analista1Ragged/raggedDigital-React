import React, { useState } from 'react';
import {
  FaAngleRight,
  FaAngleLeft, 
  FaChartBar, 
  FaThLarge, 
  FaShoppingCart, 
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaCalculator
} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import "../style/navbar.css";

const ICON_SIZE = 20;

function Navbar({ visible, show }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (openMenu === menu) {
      setOpenMenu(null); // Cerrar si el mismo menú está abierto
    } else {
      setOpenMenu(menu); // Abrir el nuevo menú
    }
  };

  return (
    <>
      <div className="mobile-nav">
        <button
          className="mobile-nav-btn"
          onClick={() => show(!visible)}
        >
          <FaBars size={24} />
        </button>
      </div>
      <nav className={!visible ? 'navbar' : ''}>
        <button
          type="button"
          className="nav-btn"
          onClick={() => show(!visible)}
        >
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>
        <div>
          <NavLink className="logo" to="/">
            <img
              src={require("../assets/Images/logo.png")}
              alt="logo"
            />
          </NavLink>
          <div className="links nav-top">
            <div className="nav-item">
              <NavLink to="/Home" className="nav-link">
                <FaHome size={ICON_SIZE} />
                <span>Inicio</span>
                <span style={{ width: ICON_SIZE, display: 'inline-block' }}>&nbsp;</span>
              </NavLink>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('analytics')}>
                <FaChartBar size={ICON_SIZE} />
                <span>Analytics</span>
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
                <span>Ecommerce</span>
                {openMenu === 'ecommerce' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
              {openMenu === 'ecommerce' && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/ecommerce/Ragged" className="nav-link">Ragged</NavLink>
                  </li>
                  <li>
                    <NavLink to="/ecommerce/Vtex" className="nav-link">Vtex</NavLink>
                  </li>
                  <li>
                    <NavLink to="/ecommerce/VerCapsulas" className="nav-link">Ver Capsulas</NavLink>
                  </li>
                </ul>
              )}
            </div>
			<div className="nav-item">
              <div className="nav-link" onClick={() => toggleMenu('contabilidad')}>
                <FaCalculator size={ICON_SIZE} />
                <span>Contabilidad</span>
                {openMenu === 'contabilidad' ? <FaChevronUp size={ICON_SIZE} /> : <FaChevronDown size={ICON_SIZE} />}
              </div>
              {openMenu === 'contabilidad' && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/contabilidad/Planos" className="nav-link">Planos</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contabilidad/Bancos" className="nav-link">Bancos	</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="links">
          <NavLink to="/settings" className="nav-link">
            <FaCog size={ICON_SIZE} />
            <span>Settings</span>
            <span style={{ width: ICON_SIZE, display: 'inline-block' }}>&nbsp;</span>
          </NavLink>
          <NavLink to="/Settings" className="nav-link">
            <FaSignOutAlt size={ICON_SIZE} />
            <span>Logout</span>
            <span style={{ width: ICON_SIZE, display: 'inline-block' }}>&nbsp;</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
