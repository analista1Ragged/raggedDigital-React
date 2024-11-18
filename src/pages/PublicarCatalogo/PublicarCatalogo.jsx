import React from 'react';
import AdjuntarArchivo from "../../components/AdjuntarArchivo/AdjuntarArchivo";
import Boton from "../../components/Boton/Boton";

const PublicarCatalogo = ({ onGenerarConciliacion, setSelectedBanco, setFileData }) => {
  return (
    <section className="formulario">
      <form onSubmit={onGenerarConciliacion}>
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '}
          Venta Directa.
        </h2>
        <AdjuntarArchivo/>
        <Boton>
          Publicar Catalógo
        </Boton>
      </form>
    </section>
  );
};

export default PublicarCatalogo;
