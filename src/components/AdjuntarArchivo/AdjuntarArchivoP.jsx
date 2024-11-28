import React, { useState, useRef } from 'react';

const AdjuntarArchivoP = ({ uploadPath, setFile }) => {
  const [fileName, setFileName] = useState("Seleccionar archivo...");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension === 'pdf' || fileExtension === 'png') {
        setFile(file); // Enviar el archivo al componente padre
        setFileName(file.name);
      } else {
        alert("Solo se permiten archivos PDF o PNG.");
        setFileName("Seleccionar archivo...");
      }
    } else {
      setFileName("Seleccionar archivo...");
      setFile(null);
    }
  };
  

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click(); // Abrir el selector de archivos
  };

  return (
    <div className="custom-form d-flex align-items-center">
      <div className="custom-file d-flex align-items-center">
        <input
          ref={fileInputRef}
          type="file"
          className="custom-file-input"
          id="customFile"
          name="archivo"
          style={{ display: 'none' }} // Ocultar el input de archivo
          accept=".pdf, .png" // Aceptar solo PDF y PNG
          onChange={handleFileChange}
        />
        <label
          className="custom-file-label"
          htmlFor="customFile"
          style={{
            border: '1px solid #ccc',
            padding: '8px 12px', // Ajustar el tamaño
          }}
          onClick={handleButtonClick} // Abrir el selector al hacer clic
        >
          {fileName}
        </label>
      </div>
    </div>
  );
};

export default AdjuntarArchivoP;
