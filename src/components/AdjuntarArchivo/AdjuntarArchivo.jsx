import React, { useState, useRef } from 'react';
import Boton from "../Boton/Boton";

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
    fileInputRef.current.click();
  };

  return (
    <form className="custom-form d-flex align-items-center">
      <div className="custom-file d-flex align-items-center">
        <input
          ref={fileInputRef}
          type="file"
          className="custom-file-input"
          id="customFile"
          name="archivo"
          style={{ display: 'none' }}
          accept=".xls, .xlsx"
          onChange={handleFileChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {fileName}
        </label>
      </div>
      <Boton onClick={handleButtonClick}>
        Seleccionar archivo
      </Boton>
    </form>
  );
};

export default AdjuntarArchivo;


