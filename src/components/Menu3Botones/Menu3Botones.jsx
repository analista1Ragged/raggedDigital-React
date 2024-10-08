import React from 'react';
import { CloudUploadOutlined, MoreOutlined, FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import { urlapi } from '../../App';

const handleUpload = async (marca,nombre) => {
  console.log(marca, 'madafaka',nombre);
  // Mostrar el cuadro de diálogo de confirmación antes de subir productos
  const confirmacion = await Swal.fire({
    title: "Esta seguro de subir el archivo?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`
  });

  if (confirmacion.isConfirmed) {
    // Proceder con la subida de productos
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
            await subirPaso(i, marca, nombre);
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
  } else if (confirmacion.isDenied) {
    Swal.fire("¡El archivo no se ha subido!", "", "info");
  }
};

const subirPaso = async (step, marca, nombre) => {
  try {
    const response = await axios.post(urlapi+`/subir/${step}`, { marca,nombre });
    return response.data.step;
  } catch (error) {
    console.error('Error en la subida:', error);
    throw error;
  }
};

const handleDownload = async (marca,nombre, archivo) => {
  try {
    const data=[marca,nombre,1]
    const response = await axios.post(urlapi+'/descargar-excel', { data }, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', archivo);
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

const Menu3Botones = ({ marca ,nombre, archivo}) => (
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
          icon={<CloudUploadOutlined />}
          title="Subir Productos a Vtex"
          style={{
            backgroundColor: '#1890ff', // Color for the upload button
            color: 'white',
          }}
          onClick={() => handleUpload(marca,nombre)} // Pasar marca a handleUpload
        />
        <FloatButton
          icon={<FileTextOutlined />}
          title="Descargar Excel"
          style={{
            backgroundColor: '#28a745', // Color for the download button
            color: 'white',
          }}
          onClick={() => handleDownload(marca,nombre,archivo)} // Asignar la función de descarga al botón de descargar Excel
        />
      </FloatButton.Group>
    </div>
  </>
);

export default Menu3Botones;
