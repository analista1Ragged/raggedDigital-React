import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "./HelpNominaElectronica.css";
import ImagenSwal from '../../assets/Images/ImagenSwal.png'; // Importar la imagen

// Componente que renderiza una presentación de PowerPoint usando iframe
const PowerPoint = ({ src }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mostrar SweetAlert cuando se carga el componente
    Swal.fire({
      title: ' ',
      html: '<p style="color: black; font-weight: bold;">POR FAVOR ESPERE MIENTRAS CARGA EL...</p>', // Usar html para soportar etiquetas HTML
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false,
      background: `url(${ImagenSwal}) center/cover no-repeat`, // Utilizar la imagen como fondo
      customClass: {
        popup: 'swal-custom', // Aplicar la clase personalizada
      },
    });
  
    // Simular la finalización de la carga (esto debería ajustarse según las necesidades del proyecto)
    setTimeout(() => {
      setLoading(false);
      Swal.close(); // Cerrar el Swal una vez que se haya terminado de cargar
    }, 3000); // Aquí 3000 es un ejemplo de tiempo de espera de 3 segundos
  }, []);
  
  

  return (
    <section className="center-section">
      {!loading && (
        <div style={{ position: 'relative', width: '100%', height: 'calc(118.5vh - 100px)', overflow: 'hidden' }}>
          <iframe
            src={src} // Usar la prop src aquí
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none', // Elimina el borde del iframe
              margin: 0,
              padding: 0,
            }}
            allowFullScreen={true}
            mozallowfullscreen="true"
          />
        </div>
      )}
    </section>
  );
};

export default PowerPoint;

