import React, { useState } from 'react';
import Boton from "../../components/Boton/Boton";
import Swal from "sweetalert2";
import { urlapi } from "../../App"; // Asegúrate de tener esto configurado
import excelExample from '../../assets/Images/contabilidad_rut_captura1.png';
import folderExample from '../../assets/Images/contabilidad_rut_captura2.png';

const AutomatizacionDIanRut = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadBot = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    Swal.fire({
      title: 'Preparando descarga',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${urlapi}/RaggedDigitalAPI/contabilidad/botCedulasRut`, {
        method: 'GET',
        credentials: 'include' // Necesario si usas autenticación con cookies
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Obtener el blob del ejecutable
      const blob = await response.blob();
      
      // Crear enlace temporal para descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Ragged_Cedulas_Rut.exe'; // Nombre del archivo descargado
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      a.remove();

      Swal.fire({
        icon: 'success',
        title: 'Descarga completada',
        text: 'El bot se ha descargado correctamente',
      });

    } catch (error) {
      console.error('Error al descargar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en la descarga',
        text: error.message || 'No se pudo descargar el bot',
      });
    } finally {
      setLoading(false);
    }
  };

return (
  <section className="formulario">
    <form onSubmit={handleDownloadBot}>
      <h2>
        <a href="/RaggedDigital/Home" className="left" title="volver">
          <i className="bi bi-arrow-left-circle"></i>
        </a>
        {' '}Automatización Rut Dian
      </h2>
      
      <div className="pasos-container">
        {/* Paso 1: Descargar ejecutable */}
        <div className="paso-card">
          <div className="paso-header">
            <span className="paso-numero">1</span>
            <h3>Descarga el ejecutable</h3>
          </div>
          <div className="paso-content">
            <Boton type="submit" disabled={loading} className="download-btn">
              {loading ? (
                <>
                  <i className="bi bi-cloud-download"></i> Descargando...
                </>
              ) : (
                <>
                  <i className="bi bi-download"></i> Descargar Bot RUT
                </>
              )}
            </Boton>
          </div>
        </div>

        {/* Paso 2: Preparar archivo Excel */}
        <div className="paso-card">
          <div className="paso-header">
            <span className="paso-numero">2</span>
            <h3>Coloca los ID a consultar en la columna A del archivo <strong>"CedulaRut.xlsx"</strong> 
                en la misma carpeta donde descargaste el ejecutable.</h3>
          </div>
          <div className="paso-content">
            <div className="file-example">
              <img 
                src={excelExample}
                alt="Ejemplo de archivo Excel" 
                className="example-image"
              />
            </div>
          </div>
        </div>

        {/* Paso 3: Ejecutar el programa */}
        <div className="paso-card">
          <div className="paso-header">
            <span className="paso-numero">3</span>
            <h3> Ejecuta <strong>"Ragged_Cedulas_Rut.exe"</strong> (asegúrate que el archivo Excel <strong>NO</strong> esté abierto).
                Al terminar, tendrás la información completa en el mismo archivo.</h3>
          </div>
          <div className="paso-content">
            <div className="folder-example">
              <img 
                src={folderExample}
                alt="Contenido de la carpeta" 
                className="example-image"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
);
};

export default AutomatizacionDIanRut;
