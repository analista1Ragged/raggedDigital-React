// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Síguenos en:</h4>
          <div className="social-media">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Mapa del sitio</h4>
          <ul>
            <li><a href="https://www.ragged.com.co/tiendas" target="_blank" rel="noopener noreferrer">Nuestras Tiendas</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>COMERCIALIZADORA RAGGED Y CIA S.A.S</h4>
          <p>NIT: 890.937.146-8</p>
        </div>
        <div className="footer-column">
          <h4>Dirección:</h4>
          <p>Calle 6 sur # 51 - 14 Medellín, Colombia</p>
          <p>PBX (604 604 23 01) </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Ragged. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
