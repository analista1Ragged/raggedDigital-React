// src/components/Footer.js
import React from 'react';
import './FooterPrueba.css';
import fbimg from '../../assets/Images/fbimg.png'
import instagram from '../../assets/Images/instagramimg-.png'
import youtube from '../../assets/Images/youtubeimg-.png'
import pinteres from '../../assets/Images/pinteresimg-.png'
import videoDemo from '../../assets/videos/Video.mp4'; // Importa el video


const FooterPrueba = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-left">
      
      <video width="50%" controls>
      <source src={videoDemo} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </div>
      <div className="footer-top">
        
        <div className="footer-right">
        <div className="footer-column">
        <div>
        <h4>¡Estas a un paso de ser empresaria Ragged, </h4>
        <h4>ten a la mano tu cédula y celular!</h4>
        
          <ul className="nit">
            <li><a href="https://www.ragged.com.co/tiendas" title="Nuestras Tiendas" target="_blank" rel="noopener noreferrer">¡Registrate ahora!</a></li>
          </ul>
        </div>
          <h4>Síguenos en:</h4>
          <div className="social-media">
            <a href="https://www.facebook.com/RaggedStores/ " className="social-icon" target="_blank" rel="noopener noreferrer" title="Facebook">
              <img src={fbimg} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/raggedstores/" className="social-icon" target="_blank" rel="noopener noreferrer" title="Instagram">
              <img src={instagram} alt="Instagram" />
              </a>
            <a href="https://www.youtube.com/channel/UCSDPXTxZ_0-HQJaOcgZSfyQ" className="social-icon" target="_blank" rel="noopener noreferrer" title="Youtube">
              <img src={youtube} alt="YouTube" />
            </a>
            
            <a href="https://co.pinterest.com/raggedstores/" className="social-icon nit" target="_blank" rel="noopener noreferrer" title="Pinteres">
              <img src={pinteres} alt="Pinteres" />
            </a>
        </div>
        </div>
        <div className="footer-column">
          <h4>COMERCIALIZADORA RAGGED Y CIA S.A.S.</h4>
          <p className="nit">NIT 890.937.146-8</p> {/* Agrega esta línea del NIT */}
        </div>
        <div className="footer-column">
          <h4>Dirección:</h4>
          <p>Calle 6 sur # 51 - 14 Medellín, Colombia</p>
          <p>PBX (604 604 23 01) </p>
        </div>
      </div>
      </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Ragged. Todos los derechos reservados.</p>
        <p>V-002</p>
      </div>
    </footer>
    
  );
};

export default FooterPrueba;  