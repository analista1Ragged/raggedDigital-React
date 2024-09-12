import React from 'react';
import "./NominaElectronica.css";
import ListaOpcionesP from '../../components/ListaOpciones/ListaOpcionesP';
import Boton from '../../components/Boton/Boton';
import SeleccionarFechaP from '../../components/SeleccionarFecha/SeleccionarFechaP';

const NominaElectronica = () => {
  return (
    <section className="formulario">
      {/* Título fuera del formulario */}
      <h2>
        <a href="/RaggedDigital/Home" className="left" title="volver">
          <i className="bi bi-arrow-left-circle"></i>
        </a>
        {'  '}
        Informe de nómina electrónica.
      </h2>

      {/* Componente de fecha fuera del formulario */}
      <SeleccionarFechaP/>

      <form>
        <ListaOpcionesP 
        label="Seleccionar unidad de negocio." 
        selectText="Seleccionar..."
        />
        <Boton>
          Descargar Nómina
        </Boton>
      </form>
    </section>
  );
};

export default NominaElectronica;

