import React, { useState, useMemo, useRef } from 'react';
import '../PedidosVtex/PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Tag } from 'antd';
import 'antd/dist/reset.css';
//import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import Menu2BotonesG from '../../components/Menu3Botones/Menu2BotonesG.jsx';
import BuscarDescargar from '../../components/BotonDescargar/BotonDescargar.jsx';
import FilterRecibosDeCaja from '../../components/FilterRow/FilterRecibosCaja';
//import ListaOpcionesP from "../../components/ListaOpciones/ListaOpcionesP.jsx";
import MultiSelector from 'src/components/MultiSelector/MultiSelector';

const RecibosDeCaja = () => {
  const [valorCampo, setValorCampo] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [data, setData] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const seleccionarFechaRef = useRef(null);
  const [listaClientes, setListaClientes] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);

  const [filtersRecibosCaja, setFiltersRecibosCaja] = useState({
    fecha_recibo: '',
    nit: '',
    razonSocial: '',
    reciboDeCaja: '',
    auxiliar: '',
    descripcionAuxiliar: '',
    debito: '',
    credito: '',
    dctoCruce: '',
    fechaRecaudo: '',
    fechaVencimiento: '',
    usuarioAprobacion: '',
    origen: '',
  });

  // Función simulada para manejar búsqueda
  const handleBuscarClick = () => {
    console.log("Buscando con:", { 
      fecha: seleccionarFechaRef.current?.getDates(),
      valorCampo,
      vendedor 
    });
  };

  // Función simulada para limpiar filtros
  const clearSelector = () => {
    setFiltersRecibosCaja({
      fecha_recibo: '',
      nit: '',
      razonSocial: '',
      reciboDeCaja: '',
      auxiliar: '',
      descripcionAuxiliar: '',
      debito: '',
      credito: '',
      dctoCruce: '',
      fechaRecaudo: '',
      fechaVencimiento: '',
      usuarioAprobacion: '',
      origen: '',
    });
    setValorCampo('');
    setSelectedOrders({});
  };

  // Función simulada para generar pedidos
  const handleGenerate = () => {
    console.log("Generando pedidos para:", selectedOrders);
  };

  // Función simulada para descargar guías
  const downloadExcelFile = () => {
    console.log("Descargando guías para:", selectedOrders);
  };

  // Datos de ejemplo para mostrar en la tabla
  const currentItems = useMemo(() => [
    {
      id: 1,
      almacen: 'BOG01',
      pedidoVtex: '1468170630881-01',
      pedidoERP: 'ERP001',
      cliente: 'Cliente Ejemplo',
      formaDePago: 'Crédito',
      vrPedido: '$1,250,000',
      fechaPedido: '15/05/2023',
      estadoVtex: 'payment-approved',
      estadoSiesa: 'Aprobado'
    },
    // ... más datos de ejemplo
  ], []);

  return (
    <section className="pedidosvtex-section">
      <div className="pedidosvtex-ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="pedidosvtex-left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Recibos de Caja
        </h2>
        
        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
          <i className="bi bi-filter"></i>
        </a>
        {'  '} Filtrar por: 
        
        <form>
          <div className="pedidosvtex-container">
            <div className="pedidosvtex-multi-selector">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MultiSelector 
                    options={listaClientes}
                    opc='0'
                    placeholder="Filtrar por Nit:"
                    onSelectChange={setSelectedClientes} 
                    value={selectedClientes}
                  />
              </div>
              <div className="row">
                <div className="col">
                  <div className="separador">
                    <SeleccionarFecha className="component-item" ref={seleccionarFechaRef}/>
                    <BuscarButton className="component-item" onClick={handleBuscarClick} />
                    <BuscarDescargar onClick={clearSelector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <Menu2BotonesG 
          onGenerate={handleGenerate} 
          onDownload={downloadExcelFile} 
        />

        <div className="pedidosvtex-tabla-container">
          <div className="pedidosvtex-tabla-scroll">
            <table className="table table-striped table-hover pedidosvtex-ticket-table">
              <thead>
                <tr>
                  <th scope="col" className="pedidosvtex-ticket-table3">#</th>
                  <th scope="col">Fecha_Recibo</th>
                  <th scope="col" className="pedidosvtex-ticket-table2">Nit</th>
                  <th scope="col">Razon_Social</th>
                  <th scope="col">Recibo_de_Caja</th>
                  <th scope="col">Auxiliar</th>
                  <th scope="col">Descripción_Auxiliar</th>
                  <th scope="col">DB</th>
                  <th scope="col" className="pedidosvtex-ticket-table2">CR</th>
                  <th scope="col">Dcto_Cruce</th>
                  <th scope="col">Fecha_Recaudo</th>
                  <th scope="col">Fecha_Vencimiento</th>
                  <th scope="col">Usuario_Aprobación</th>
                  <th scope="col">Origen</th>
                </tr>
              </thead>
              
              {/* Mueve el FilterRecibosDeCaja fuera del thead */}
              <FilterRecibosDeCaja 
                filtersRecibosCaja={filtersRecibosCaja} 
                handleFilter={(e) => setFiltersRecibosCaja({
                  ...filtersRecibosCaja,
                  [e.target.name]: e.target.value
                })}
                allSelected={allSelected}
                setAllSelected={setAllSelected}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                currentItems={currentItems} 
              />
              
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fecha_recibo || '-'}</td>
                    <td>{item.nit || '-'}</td>
                    <td>{item.razonSocial || '-'}</td>
                    <td>{item.reciboDeCaja || '-'}</td>
                    <td>{item.auxiliar || '-'}</td>
                    <td>{item.descripcionAuxiliar || '-'}</td>
                    <td>{item.debito || '-'}</td>
                    <td>{item.credito || '-'}</td>
                    <td>{item.dctoCruce || '-'}</td>
                    <td>{item.fechaRecaudo || '-'}</td>
                    <td>{item.fechaVencimiento || '-'}</td>
                    <td>{item.usuarioAprobacion || '-'}</td>
                    <td>{item.origen || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecibosDeCaja;