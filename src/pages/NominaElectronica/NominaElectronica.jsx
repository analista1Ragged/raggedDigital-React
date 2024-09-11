import React from 'react';
import "./NominaElectronica.css";
import ListaOpciones from "../../components/ListaOpciones/ListaOpciones";
import Boton from '../../components/Boton/Boton';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha';

const NominaElectronica = () => {
  return (
    <section className="formulario">
      <form>
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '}
          Informe de nómina electrónica.
        </h2>
        <SeleccionarFecha />
        <ListaOpciones />
        <Boton>
          Descargar Nómina
        </Boton>
      </form>
    </section>
  );
};

export default NominaElectronica;
