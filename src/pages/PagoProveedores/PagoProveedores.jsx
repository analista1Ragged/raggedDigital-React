import React from "react";
import "./PagoProveedores.css";
import { GiClick } from "react-icons/gi"; 

const PagoProveedores = () => {
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Pago a Proveedores
          
        </h2>

        <div className="tabla-container" style={{ marginTop: "40px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nit Tercero</th>
                <th>Razon Social Documento</th>
                <th>Nit Tercero Movimiento</th>
                <th>Razon Social Movimiento</th>
                <th>Dcto Siesa</th>
                <th>Dcto Proveedor</th>
                <th>Fecha</th>
                <th>Pago</th>
                <th>DB</th>
                <th>CR</th>
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

export default PagoProveedores;