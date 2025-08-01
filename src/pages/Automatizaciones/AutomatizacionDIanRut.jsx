import React, { useState } from 'react';
import Boton from "../../components/Boton/Boton";
import Swal from 'sweetalert2';

const AutomatizacionDIanRut = () => {
  



  return (
    <section className="formulario">
      <form onSubmit={""}>
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {' '}Automatización Rut Dian.
        </h2>
        <Boton>
          Extraer Data Dian
        </Boton>
      </form>
    </section>
  );
};

export default AutomatizacionDIanRut;
