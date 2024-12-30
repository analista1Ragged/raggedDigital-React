import React from 'react';
import "./ReporteCostos.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import Boton from 'src/components/Boton/Boton';


const ReportesCostos = () => {
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Costos Mahalo
        </h2>  
        <form>
          <div className="container-2">
            <div className="row-3">
              <Boton>Generar Costos</Boton>
              <Boton>Importar</Boton>
            </div>
          </div>
        </form>
        {/* Contenedor con scroll horizontal */}
        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Referencia</th>
              <th scope="col">Costo</th>
            </tr>
          </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>PF31122296</td>
                  <td>34604</td>
                </tr>
            </tbody>
            </table>
            <div className="container-2">
            <div className="row-3">
              <Boton>Exportar</Boton>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportesCostos;