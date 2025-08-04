import React from 'react';
import { RiCustomerServiceFill } from "react-icons/ri";
import { LuBadgeHelp } from "react-icons/lu"; 
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation
import './Header.css';
import Logo from '../../assets/Images/logo.png'; // Importa la imagen que quieres centrar
import TDiggital from '../../assets/Images/TDiggital.png';
import { CupoEmpleados, NominaElectronica } from 'src/pages';

const manuals = {
  ecommerce: require('../../assets/docts/MANUAL DE USABILIDAD ECOMMERCE.pdf'),
  cartera: require('../../assets/docts/MANUAL DE USABILIDAD CARTERA.pdf'),
  bancos: require('../../assets/docts/MANUAL DE USABILIDAD BANCOS.pdf'),
  inventarios: require('../../assets/docts/MANUAL DE USABILIDAD INVENTARIOS.pdf'),
  nomina: require('../../assets/docts/MANUAL DE USABILIDAD NÓMINA ELECTRONICA.pdf'),
  pedidosVtex: require('../../assets/docts/MANUAL DE USABILIDAD PEDIDOS VTEX.pdf'),
  referenciasyplus: require('../../assets/docts/MANUAL DE USABILIDAD REFERENCIAS Y PLUS.pdf'),
  costos: require('../../assets/docts/MANUAL DE USABILIDAD COSTOS.pdf'),
  escalaDePrecios: require('../../assets/docts/MANUAL DE USABILIDAD ESCALA DE PRECIOS.pdf'),
  cruceDocumentos: require('../../assets/docts/MANUAL DE USABILIDAD CRUCE DOCUMENTOS.pdf'),
  CupoEmpleados: require('../../assets/docts/MANUAL DE USABILIDAD CONSULTA CUPO EMPLEADO.pdf'),
  DianRut: require('../../assets/docts/MANUAL DE USABILIDAD EXTRAER RUT DIAN.pdf'),
};

const Header = () => {
  const location = useLocation(); // Hook para obtener la ruta actual

  // Función para obtener el enlace correcto basado en la ruta
  const getHelpLinkForPage = () => {
    const helpLinks = {
      '/Mercadeo/Raqstyle/Inventario': manuals.inventarios,
      '/Mercadeo/Raqstyle/Cartera': manuals.cartera,
      '/TalentoHumano/Nomina/NominaElectronica': manuals.nomina,
      '/ecommerce/VerCapsulas': manuals.ecommerce,
      '/Contabilidad/Bancos': manuals.bancos,
      '/Logistica/CanalDigital/Vtex': manuals.pedidosVtex,
      '/Maestros/Referencias': manuals.referenciasyplus,
      '/Maestros/Costos': manuals.costos,
      '/Maestros/EscalasPrecios' : manuals.escalaDePrecios,
      '/Cartera/RecibosCaja': manuals.cruceDocumentos,
      '/Mercadeo/Tiendas/CupoEmpleados': manuals.CupoEmpleados,
      '/Contabilidad/Automatizaciones/DianRut' : manuals.DianRut
    };
  
    return helpLinks[location.pathname] || null;
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
        <a href="https://greggo.ragged.com.co/" target="_blank" rel="noopener noreferrer">
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





