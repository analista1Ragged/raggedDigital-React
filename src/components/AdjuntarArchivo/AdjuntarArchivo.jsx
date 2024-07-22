import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const AdjuntarArchivo = ({ setFile }) => {
  const [fileName, setFileName] = useState("Seleccionar archivo...");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setFile(worksheet);
      };
      reader.readAsArrayBuffer(file);
      setFileName(file.name);
    } else {
      setFileName("Seleccionar archivo...");
      setFile(null);
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click(); // Open the file selector dialog
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
          style={{ display: 'none' }} // Hide the file input element
          accept=".xls, .xlsx"
          onChange={handleFileChange}
        />
        <label
          className="custom-file-label"
          htmlFor="customFile"
          style={{
            border: '1px solid #ccc',
            padding: '8px 12px', // Adjust the padding for a better size
          }}
          onClick={handleButtonClick} // Open the file selector when the label is clicked
        >
          {fileName}
        </label>
      </div>
    </div>
  );
};

export default AdjuntarArchivo;
