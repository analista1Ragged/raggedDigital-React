// src/components/Footer.js
import React from 'react';
import './Carrusel.css';
import fbimg from '../../assets/Images/fbimg.png'
import instagram from '../../assets/Images/instagramimg-.png'
import youtube from '../../assets/Images/youtubeimg-.png'
import pinteres from '../../assets/Images/pinteresimg-.png'
import videoDemo from '../../assets/videos/Video.mp4'; // Importa el video


const Carrusel = () => {
  return (

    <footer className="footer-prueba">
  <div className="footer-container">
    
    <div className="footer-left">
      
      <video width="50%" controls>
      <source src={videoDemo} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </div>

   
    <div className="footer-right">
  <div className="footer-column">
    <h4>¡Estas a un paso de ser empresaria Ragged, ten a la mano tu cédula y celular!</h4>
    <ul>
      <li><a href="https://www.ventadirecta.com.co" target="_blank" rel="noopener noreferrer">¡Regístrate ahora!</a></li>
    </ul>
  </div>

  <div className="footer-column">
    <h4>Síguenos en:</h4>
    <div className="social-media">
      <a href="https://www.facebook.com/RaggedStores/" className="social-icon" target="_blank" rel="noopener noreferrer">
        <img src={fbimg} alt="Facebook" />
      </a>
      <a href="https://www.instagram.com/raggedstores/" className="social-icon" target="_blank" rel="noopener noreferrer">
        <img src={instagram} alt="Instagram" />
      </a>
      <a href="https://www.youtube.com/channel/UCSDPXTxZ_0-HQJaOcgZSfyQ" className="social-icon" target="_blank" rel="noopener noreferrer">
        <img src={youtube} alt="YouTube" />
      </a>
      <a href="https://co.pinterest.com/raggedstores/" className="social-icon" target="_blank" rel="noopener noreferrer">
        <img src={pinteres} alt="Pinterest" />
      </a>
    </div>
  </div>

  <div className="footer-column">
    <h4>COMERCIALIZADORA RAGGED Y CIA S.A.S.</h4>
    <p>NIT: 890.937.146-8</p>
  </div>

  <div className="footer-column">
    <h4>Dirección:</h4>
    <p>Calle 6 sur # 51 - 14 Medellín, Colombia</p>
    <p>PBX (604 604 23 01)</p>
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

export default Carrusel;

