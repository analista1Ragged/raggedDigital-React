import React from "react";
import "./LogsTerceros.css";
import { GiClick } from "react-icons/gi"; 

const LogsTerceros = () => {
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Clientes con Inconsistencias
          
        </h2>

        <div className="tabla-container" style={{ marginTop: "40px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Bodega</th>
                <th>Cedula</th>
                <th>Error</th>
                <th>Tipo Ident.</th>
                <th>Razon Social</th>
                <th>Apellido 1</th>
                <th>Apellido 2</th>
                <th>Nombres</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12">
                  <GiClick style={{ marginRight: "10px", verticalAlign: "middle" }} />
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LogsTerceros;
