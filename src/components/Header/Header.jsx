import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { RiCustomerServiceFill } from "react-icons/ri";
import './Header.css'; // Puedes ajustar los estilos en un archivo separado
import TDiggital from '../../assets/Images/TDiggital.png';

const Header = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {/*<h3>Mi Aplicación</h3>  Título o logo */}
      </div>
      <div className="top-bar-right">
        <FaBell className="top-bar-icon" />
        <a href="https://glpi.ragged.com.co" target="_blank" rel="noopener noreferrer">
          <div className="top-bar-icon">
            <RiCustomerServiceFill 
              title='Mesa de Ayuda'
            />
          </div>
        </a>
      </div>
      <a href="https://glpi.ragged.com.co" target="_blank" rel="noopener noreferrer">
        <div className='top-bar-image'>
          <img src={TDiggital} alt="TDiggital" className="TDiggital"/>
        </div>
      </a>
    </div>
  );
};

export default Header;




