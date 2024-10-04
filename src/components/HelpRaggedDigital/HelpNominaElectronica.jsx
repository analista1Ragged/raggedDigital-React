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
      html: '<p style="color: black; font-weight: bold;">POR FAVOR ESPERE MIENTRAS CARGA EL...</p>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false,
      background: `url(${ImagenSwal}) center/cover no-repeat`,
      customClass: {
        popup: 'swal-custom', // Aplicar la clase personalizada
      },
    });
  }, []);

  // Función para manejar el evento onLoad del iframe
  const handleIframeLoad = () => {
    setLoading(false);
    Swal.close(); // Cerrar el Swal una vez que se haya terminado de cargar
  };

  return (
    <section className="center-section">
      {loading && (
        <div>Cargando...</div> // Mensaje mientras se carga (opcional)
      )}
      <div style={{ position: 'relative', width: '100%', height: 'calc(118.5vh - 100px)', overflow: 'hidden' }}>
        <iframe
          src={src}
          onLoad={handleIframeLoad} // Llama a la función cuando el iframe se haya cargado
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
          }}
          allowFullScreen={true}
          mozallowfullscreen="true"
        />
      </div>
    </section>
  );
};

export default PowerPoint;


