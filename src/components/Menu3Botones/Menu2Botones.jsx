import React from 'react';
import { CloudUploadOutlined, MoreOutlined, FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const handleDownload = (data, archivo) => {
  try {
    // Obtener los encabezados a partir de las claves del primer objeto
    const headers = Object.keys(data[0]);

    // Filtrar las columnas que no se desean (excluyendo las 5, 8, 9, 10, 11)
    const filteredHeaders = headers.filter((header, index) => ![5, 8, 9, 10, 11].includes(index));

    // Crear un array de arrays a partir de los datos, excluyendo las columnas no deseadas
    const rows = data.map(obj => filteredHeaders.map(header => obj[header]));

    // Añadir los encabezados como la primera fila
    const worksheetData = [filteredHeaders, ...rows];

    // Crear la hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Crear el libro de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Generar el archivo Excel
    XLSX.writeFile(wb, archivo);
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al descargar el archivo.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    console.error('Error en la descarga:', error);
  }
};

const Menu2Botones = ({ marca, archivo}) => (
  <>
    <div>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
        icon={<MoreOutlined style={{ color: 'white' }} />}
      >
        <FloatButton
          icon={<FileTextOutlined />}
          title="Descargar Excel"
          style={{
            backgroundColor: '#28a745', // Color para el botón de descarga
            color: 'white',
          }}
          onClick={() => handleDownload(marca, archivo)} // Asignar la función de descarga al botón de descargar Excel
        />
      </FloatButton.Group>
    </div>
  </>
);

export default Menu2Botones;
