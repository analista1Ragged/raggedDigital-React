import React, { useState } from 'react';
import AdjuntarArchivo from "../components/AdjuntarArchivo/AdjuntarArchivo";
import ListaOpciones from "../components/ListaOpciones/ListaOpciones";
import Boton from "../components/Boton/Boton";
import axios from 'axios';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';


const Bancos = () => {
  const [selectedBanco, setSelectedBanco] = useState("");
  const [fileData, setFileData] = useState(null);

   const sendEmail = (subject, message) => {
     emailjs.send('service_tnkzfmd', 'template_b0w6ahf', {
       to_email: sessionStorage.getItem('log'),
       subject: subject,
       message: message
     }, 'oxkvHR1qKePmFBaOS')
     .then((result) => {
       console.log('Email successfully sent!',result);
     }, (error) => {
       console.error('There was an error sending the email:', error);
     });
   };

  const handleGenerarConciliacion = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (!selectedBanco) {
      Swal.fire('Error', 'Por favor seleccione un banco.', 'error');
      return;
    }

    if (!fileData) {
      Swal.fire('Error', 'Por favor seleccione un archivo.', 'error');
      return;
    }

    try {
      Swal.fire({
        title: 'Generando conciliación...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.post('http://127.0.0.1:5000/generar-conciliacion', {
        banco: selectedBanco,
        datos: fileData
      });
      console.log(fileData);
      Swal.close();
      Swal.fire('Éxito', 'La conciliación se ha generado correctamente.', 'success');
      sendEmail('Conciliación Generada', `La conciliación para el banco ${selectedBanco} se ha generado correctamente.`);
      console.log('Conciliación generada:', selectedBanco);
    } catch (error) {
      Swal.close();
      Swal.fire('Error', 'Hubo un problema al generar la conciliación.', 'error');
      sendEmail('Error al Generar Conciliación', `Hubo un problema al generar la conciliación para el banco ${selectedBanco}.`);
      console.error('Error al generar la conciliación:', error);
    }
  };

  return (
    <section className="formulario">
      <form onSubmit={handleGenerarConciliacion}>
        <h2>
          <a href="/contabilidad/Bancos" className="left" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Generar planos por banco.
        </h2>
        <AdjuntarArchivo setFile={setFileData} />
        <ListaOpciones setSelectedBanco={setSelectedBanco} />
        <Boton>
          Generar Conciliación
        </Boton>
      </form>
    </section>
  );
};

export default Bancos;
  );
};

export default Bancos;
