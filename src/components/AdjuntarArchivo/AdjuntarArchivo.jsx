import React, { useState } from 'react';
import Boton from "../Boton/Boton"

const AdjuntarArchivo = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Aquí puedes manejar el archivo como quieras (por ejemplo, subirlo a un servidor)
      console.log("Archivo seleccionado:", selectedFile);
    } else {
      console.log("No se ha seleccionado ningún archivo");
    }
  };

  return (
    
    <div className="lista-opciones">
      <label >Seleccionar archivo</label>
      <form className="formulario">
        
        <input 
          type="file" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          id="fileInput"
        />
        <div>
        <label className="lista-opciones" htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        <Boton>
            Adjuntar Archivo
        </Boton>
        </label>
        {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
        </div>
      </form>
    </div>
  );
};

export default AdjuntarArchivo;
