import React from 'react';
import "./ReporteReferencias.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import Boton from 'src/components/Boton/Boton';


const ReporteReferencias = () => {
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Exportar Planos Mahalo
        </h2>  
        <form>
          <div className="container-2">
            <div className="row-3">
              <Boton>Generar</Boton>
              <Boton>Exportar CSV</Boton>
              <Boton>Actualizar Maestras</Boton>
            </div>
          </div>
        </form>
        {/* Contenedor con scroll horizontal */}
        <div className="tabla-container">
        <h2 className="tabla-titulo">Referencias:
        </h2>
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">C_Referencia</th>
              <th scope="col">Referencia</th>
              <th scope="col">Descripción</th>
              <th scope="col">Proveedor</th>
              <th scope="col">Marca</th>
              <th scope="col">Linea</th>
              <th scope="col">C_Categoria</th>
              <th scope="col">Subcategoria</th>
              <th scope="col">Segmento</th>
              <th scope="col">Sector</th>
              <th scope="col">Colección</th>
              <th scope="col">Clasificación</th>
              <th scope="col">Iva</th>
              <th scope="col">Pr_Compra</th>
              <th scope="col">Pr_Venta</th>
              <th scope="col">Pr_Ponderado</th>
              <th scope="col">Presentación</th>
              <th scope="col">Max_Dcto</th>
              <th scope="col">Cambia_Precio</th>
              <th scope="col">Categoria</th>
              <th scope="col">Explosión</th>
              <th scope="col">Promoción</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Und_Medida</th>
              <th scope="col">Surtido</th>
              <th scope="col">Pr_Maximo</th>
              <th scope="col">Decimal</th>
              <th scope="col">Sw_Serial</th>
              <th scope="col">Sw_Valida_Max_Dcto</th>
              <th scope="col">Sw_Venta_Negativa</th>
            </tr>
          </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>49354</td>
                  <td>PF31122296</td>
                  <td>CAMISETA DEVORE</td>
                  <td>1</td>
                  <td>3</td>
                  <td>3</td>
                  <td>3</td>
                  <td>2</td>
                  <td>1</td>
                  <td>32</td>
                  <td>50954</td>
                  <td>2</td>
                  <td>19</td>
                  <td>0.0</td>
                  <td>89900</td>
                  <td>0.0</td>
                  <td>0</td>
                  <td>70</td>
                  <td>1</td>
                  <td>P</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
            </tbody>
            
            </table>
          </div>
        </div>
        <div className="tabla-container">
        <h2 className="tabla-titulo">Plus Nuevos y faltantes:
        </h2>
          <div className="tabla-scroll">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">C_Plu</th>
                <th scope="col">Referencia</th>
                <th scope="col">Barra</th>
                <th scope="col">C_Facturación</th>
                <th scope="col">Talla</th>
                <th scope="col">C_Color</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>991</td>
                  <td>PF31122296</td>
                  <td>7703844258912</td>
                  <td>7703844258912</td>
                  <td>M</td>
                  <td>000</td>
                </tr>
                
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReporteReferencias;
