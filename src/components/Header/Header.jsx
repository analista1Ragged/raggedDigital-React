import React from 'react';
import { RiCustomerServiceFill } from "react-icons/ri";
import { LuBadgeHelp } from "react-icons/lu"; 
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation
import './Header.css';
import TDiggital from '../../assets/Images/TDiggital.png';

const Header = () => {
  const location = useLocation(); // Hook para obtener la ruta actual

  // Función para obtener el enlace correcto basado en la ruta
  const getHelpLinkForPage = () => {
    switch (location.pathname) {
      case '/Mercadeo/Raqstyle/Inventario':
        return '/RaggedDigital/HelpCartera'; // Enlace para Inventario
      case '/Mercadeo/Raqstyle/Cartera':
        return '/RaggedDigital/HelpCartera'; // Enlace para Cartera
      case '/TalentoHumano/Nomina/NominaElectronica':
        return '/RaggedDigital/HelpNomina'; // Enlace para Nómina Electrónica
      default:
        return null; // No mostrar el ícono si no está en una ruta especificada
    }
  };

  const helpLink = getHelpLinkForPage();

  return (
    <div className="top-bar">
      <div className="top-bar-right">
        {helpLink && ( // Solo muestra el ícono LuBadgeHelp si hay un enlace válido
          <a href={helpLink} target="_blank" rel="noopener noreferrer">
            <LuBadgeHelp 
              className="top-bar-icon"
              title='Manual de usuario'
            />
          </a>
        )}
        <a href="https://glpi.ragged.com.co" target="_blank" rel="noopener noreferrer">
          <RiCustomerServiceFill 
            className="top-bar-icon"
            title='Mesa de Ayuda'
          />
        </a>
      </div>
      <div className="top-bar-image">
        <img src={TDiggital} alt="TDiggital" className="TDiggital"/>
      </div>
    </div>
  );
};

export default Header;



