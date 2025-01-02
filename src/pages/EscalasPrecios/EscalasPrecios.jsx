import React from 'react';
import "./EscalasPrecios.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import Boton from 'src/components/Boton/Boton';
import FiltrarBuscar from 'src/components/FiltrarBuscar/FiltrarBuscar';


const EscalasPrecios = () => {
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Escala de Precios
        </h2> 
        <FiltrarBuscar/> 
        <form>
          <div className="container-2">
            <div className="row-3">
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
              <th scope="col">Escala</th>
              <th scope="col">Codigo</th>
              <th scope="col">Precio</th>
              <th scope="col">Fecha</th>
              <th scope="col">Precio1</th>
              <th scope="col">Almacen</th>
              <th scope="col">Estado</th>
              <th scope="col">Iva</th>
            </tr>
          </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>59</td>
                  <td>47538</td>
                  <td>49900</td>
                  <td>09/09/2024</td>
                  <td>0</td>
                  <td>999</td>
                  <td>1</td>
                  <td>19</td>

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

export default EscalasPrecios;