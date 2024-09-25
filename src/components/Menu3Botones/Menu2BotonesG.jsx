import React from 'react';
import { MoreOutlined, FileTextOutlined } from '@ant-design/icons';
import { FaTruckFast } from "react-icons/fa6";
import { FaStripeS } from "react-icons/fa";
import { FloatButton } from 'antd';

const Menu2BotonesG = ({ onDownload, onGenerate, iconGroup = <MoreOutlined style={{ color: 'white' }} />, iconButton = <FaTruckFast />, iconButton2 = <FaStripeS />, title = "Preparar Guias", buttonStyle = { backgroundColor: '#0E79FD', color: 'white' }, groupStyle = { position: 'fixed', bottom: 20, right: 20 } }) => (
  <>
    <div>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={groupStyle} // Estilo del grupo pasado como prop
        icon={iconGroup} // Icono del grupo pasado como prop
      >
        <FloatButton
          icon={iconButton2} // Icono del botón pasado como prop
          title="Generar en Siesa"
          style={buttonStyle} // Estilo del botón pasado como prop
          onClick={onGenerate} // Función para generar en Siesa
        />
        <FloatButton
          icon={iconButton} // Icono del botón pasado como prop
          title={title} // Título pasado como prop
          style={buttonStyle} // Estilo del botón pasado como prop
          onClick={onDownload} // Función de descarga pasada como prop
        />
      </FloatButton.Group>
    </div>
  </>
);

export default Menu2BotonesG;
