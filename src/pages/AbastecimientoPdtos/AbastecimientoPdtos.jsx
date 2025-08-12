import React from 'react';
import '../PedidosVtex/PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, TimePicker, DatePicker, Form, Switch } from 'antd';
import BuscarDescargar from '../../components/BotonDescargar/BotonDescargar.jsx';
import '../../pages/RecibosDeCaja copy/styles.css';
import { TbHandClick } from 'react-icons/tb';

const BuscarButton = ({ onClick }) => (
  <button id="btnBuscar" className="mt-3 btn btn-secondary btn bold rounded-circle" type="button" onClick={onClick} title="Generar">
    <TbHandClick style={{ fontSize: 'larger' }} />
  </button>
);

const BuscarLimpiar = ({ onClick }) => (
  <button id="btnLimpiar" className="mt-3 btn btn-secondary btn bold rounded-circle" type="button" onClick={onClick} title='Limpiar Fechas'>
    <i className="bi bi-eraser-fill" style={{ fontSize: 'larger' }}></i>
  </button>
);

const RecibosDeCaja2 = () => {
  return (
    <section className="pedidosvtex-section">
      <div className="pedidosvtex-ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="pedidosvtex-left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>{' '}Reporte
        </h2>

        <div className="pedidosvtex-tabla-container">
          <div className="pedidosvtex-tabla-scroll">
            <table className="table table-striped table-hover pedidosvtex-ticket-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cod_Barras</th>
                  <th>Referencia</th>
                  <th>Descripción</th>
                  <th>Color</th>
                  <th>Talla</th>
                  <th>Marca</th>
                  <th>Tienda</th>
                  <th>Ciudad</th>
                  <th>Stock Actual</th> {/* Hasta campo los campos vienen de la API */}
                  <th>Producto Nuevo</th>
                  <th>Semanas en Tienda</th>
                  <th>Dias sin venta</th>
                  <th>Rotación nacional</th>
                  <th>Prom. Ventas Familia</th>
                  <th>Exceso</th>
                  <th>Acción</th> {/* Estos son los campos que vamos a mostrar en la tabla calculados con IA */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="17" className="text-center">
                    No hay datos para mostrar. Seleccione un rango de fechas y haga clic en Generar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Pagination
            current={1}
            pageSize={10}
            total={0}
            showSizeChanger
            pageSizeOptions={['10', '20', '50', '100']}
            showQuickJumper
            className="pagination"
          />
        </div>
      </div>
    </section>
  );
};

export default RecibosDeCaja2;
