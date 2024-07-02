import React from 'react';
import { CloudUploadOutlined, MoreOutlined,CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const handleUpload = async (marca) => {
  Swal.fire({
    title: 'Subiendo productos...',
    text: 'Subiendo productos 0 de 7',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: async () => {
      Swal.showLoading();
      try {
        for (let i = 0; i <= 6; i++) {
          await subirPaso(i, marca);
          Swal.update({
            text: `Subiendo productos ${i + 1} de 7`
          });
        }
        Swal.fire({
          title: 'Completado',
          text: 'Todos los productos se han subido correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al subir los productos.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  });
};

const subirPaso = async (step, marca) => {
  try {
    const response = await axios.post(`http://127.0.0.1:5000/subir/${step}`, { marca });
    return response.data.step;
  } catch (error) {
    console.error('Error en la subida:', error);
    throw error;
  }
};

const handleDownload = async (marca) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/descargar-excel', { marca }, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'datos.xlsx');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
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

const Menu3Botones = ({ marca }) => (
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
        icon={<MoreOutlined  style={{ color: 'white' }} />}
        >
        <FloatButton
            style={{
            backgroundColor: '#28a745', // Color for the main button
            color: 'white',
            }}
        />
        <FloatButton
          icon={<CloudUploadOutlined />}
          title="Subir Archivo"
          style={{
            backgroundColor: '#1890ff', // Color for the upload button
            color: 'white',
          }}
          onClick={() => handleUpload(marca)} // Pasar marca a handleUpload
        />
        <FloatButton
          icon={<CustomerServiceOutlined />}
          title="Descargar Excel"
          style={{
            backgroundColor: '#f39c12', // Color for the download button
            color: 'white',
          }}
          onClick={() => handleDownload(marca)} // Asignar la función de descarga al botón de descargar Excel
        />
      </FloatButton.Group>
    </div>
  </>
);
 
export default Menu3Botones;
