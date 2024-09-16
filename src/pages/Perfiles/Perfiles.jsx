import React from 'react';
import './Perfiles.css'; // Asegúrate de que esta hoja de estilos esté correctamente enlazada
import ListaOpcionesP from '../../components/ListaOpciones/ListaOpcionesP';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia';
import Boton from '../../components/Boton/Boton';
import CheckboxPerfiles from '../../components/CheckboxPefiles/CheckboxPerfiles';

const AdministracionMaestras = (props) => {
  return (
    <section>
      <h2>
        <a href="/RaggedDigital/Home" title="volver">
          <i className="bi bi-arrow-left-circle"></i>
        </a>
        {'  '} Administración de Maestras
      </h2>
      
      <div className="perfiles-container">
        <ListaOpcionesP
          label="Seleccionar Maestra." 
          selectText="Seleccionar..."
        />
      </div>

      <div className="perfiles-inline-components2">
        <CampoTexto
          placeholder="Ingrese nombre de Maestra:"
        />
        <CampoTexto
          placeholder="Código del Menú:"
        />
       
        <Boton>
          Guardar
        </Boton>
      </div>

      <div className="perfiles-tabla-container">
        <table className="perfiles-tabla-scroll perfiles-ticket-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Administrar Maestra</td>
              <td>97</td>
              <td>
                <CheckboxPerfiles/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdministracionMaestras;





