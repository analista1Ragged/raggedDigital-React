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


        <div className="pedidosvtex-container">
          <div className="pedidosvtex-multi-selector">
            <input type="text" placeholder="Filtrar por Nit:" className="filtro-nit-input" />      
          </div>
        </div>

        <div className="pedidosvtex-tabla-container">
          <div className="pedidosvtex-tabla-scroll">
            <table className="table table-striped table-hover pedidosvtex-ticket-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Día</th>
                  <th>Festivo</th>
                  <th>Hora Entrada</th>
                  <th>Hora Salida</th>
                  <th>Total horas</th>
                  <th>HD</th>
                  <th>HED</th>
                  <th>HEN</th>
                  <th>HEFD</th>
                  <th>HEFN</th>
                  <th>RN</th>
                  <th>DLD</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="15" className="text-center">
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
