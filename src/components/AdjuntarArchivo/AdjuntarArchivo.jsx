import React, { useState, useRef } from 'react';
import BotonAdjuntar from '../BotonAdjuntar/BotonAdjuntar';

const AdjuntarArchivo = () => {
  const [fileName, setFileName] = useState("Seleccionar archivo...");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Seleccionar archivo...");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Hace clic en el input file para abrir el selector de archivos
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
          style={{ display: 'none' }} // Oculta visualmente el input file
          accept=".xls, .xlsx"
          onChange={handleFileChange}
        />
        <label
          className="custom-file-label"
          htmlFor="customFile"
          style={{
            width: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginRight: '10px'
          }}
        >
          {fileName}
        </label>
      </div>
    </div>
  );
};

export default AdjuntarArchivo;
