import React from 'react';
import { RiCustomerServiceFill } from "react-icons/ri";
import { LuBadgeHelp } from "react-icons/lu"; 
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation
import './HeaderP.css';
import Logo from '../../assets/Images/LOGO-40-AÑOS-.png'; // Importa la imagen que quieres centrar
import TDiggital from '../../assets/Images/TDiggital.png';

const Header = () => {
  const location = useLocation(); // Hook para obtener la ruta actual

  // Función para obtener el enlace correcto basado en la ruta
  


  return (
    <div className="top-bar">
      <div className="top-bar-right">
        <a href="https://glpi.ragged.com.co" target="_blank" rel="noopener noreferrer">
          <RiCustomerServiceFill 
            className="top-bar-icon"
            title='Mesa de Ayuda'
          />
        </a>
      </div>
      
      {/* Imagen centrada */}
      <div className="top-bar-center">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default Header;