import React, { useState, useMemo, useRef } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd'; 
import 'antd/dist/reset.css'; 
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import FilterPedidosVtex  from '../../components/FilterRow/FilterPedidosVtex.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import Menu2BotonesG from '../../components/Menu3Botones/Menu2BotonesG.jsx';
//import BotonGenerar from '../../components/BotonGenerar/BotonGenerar.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import CheckboxPerfiles from '../../components/CheckboxPefiles/CheckboxPerfiles.jsx';
import CheckboxGroup from '../../components/Checkbox/CheckboxDoble/CheckboxGroup.jsx';
import CheckboxSelectodo from '../../components/Checkbox/CheckboxDoble/CheckboxSelectodo.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';

const EstadoFactura = ({ estado }) => {
  let color, text;

  switch (estado) {
    case "Importado":
      color = "#A0A0A0"; 
      text = "Importado";
      break;
    case "Preparando":
      color = "#FF5050"; 
      text = "Preparando";
      break;
    case "Comprometido":
      color = "#FFA500"; 
      text = "Comprometido";
      break;
    case "Facturado":
      color = "#D4B106"; 
      text = "Facturado";
      break;
    default:
        color = "#87d068"; 
      text = "Guía preparada";
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};

const transformData = (list, handleIconClick) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }

  return list.map((item, index) => ({
    item: index + 1,
    almacen: item[0] || 'N/A',
    pedidoVtex: item[1] || 'N/A',
    pedidoERP: item[2] || 'N/A',
    cliente: item[4] || 'N/A',
    formaDePago: item[5] || 'N/A',
    vrPedido: item[3] || 'N/A', 
    fechaPedido: item[6] || 'N/A', 
    //generarPedidoERP: item[8] || 'N/A', 
    estado: String(item[9]) || 'N/A',
  }));
};

const PedidosVtex = () => {
  const [data, setData] = useState([]);
  const [filtersPedidoVtex, setFiltersPedidosVtex] = useState({
    almacen: '',
    pedidoVtex: '',
    pedidoERP: '',
    cliente: '',
    formaDePago: '',
    vrPedido: '',
    fechaPedido: '',
    estado: '',
    //generarPedidoERP: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [valorCampo, setValorCampo] = useState('');
  const formRef = useRef();
  const [showMyMenu, setShowMyMenu] = useState(true);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersPedidosVtex({
      ...filtersPedidoVtex,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = useMemo(() => {
    // Calcular el índice de inicio y fin basado en la paginación
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
  
    // Filtrar los datos y luego aplicar paginación
    return data
    .filter((item) =>
      item.almacen.toLowerCase().includes(filtersPedidoVtex.almacen.toLowerCase()) &&
      item.pedidoVtex.toLowerCase().includes(filtersPedidoVtex.pedidoVtex.toLowerCase()) &&
      item.pedidoERP.toLowerCase().includes(filtersPedidoVtex.pedidoERP.toLowerCase()) &&
      item.cliente.toLowerCase().includes(filtersPedidoVtex.cliente.toLowerCase()) &&
      item.formaDePago.toLowerCase().includes(filtersPedidoVtex.formaDePago.toLowerCase()) &&
      item.vrPedido.toLowerCase().includes(filtersPedidoVtex.vrPedido.toLowerCase()) &&
      //item.impuestos.toLowerCase().includes(filtersPedidoVtex.impuestos.toLowerCase()) &&
      item.fechaPedido.toLowerCase().includes(filtersPedidoVtex.fechaPedido.toLowerCase()) &&
      //item.generarPedidoERP.toLowerCase().includes(filtersPedidoVtex.generarPedidoERP.toLowerCase()) &&
      (typeof item.estado === 'string' ? item.estado.toLowerCase() : item.estado.toString()).includes(filtersPedidoVtex.estado.toLowerCase())
    )
    .slice(start, end);
}, [currentPage, pageSize, data, filtersPedidoVtex]);

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const initialFiltersCartera = useMemo(() => ({
    almacen: '',
    pedidoVtex:'',
    pedidoERP:'',
    cliente: '',
    formaDePago: '',
    vrPedido: '',
    estado: '',
  }), []);

  const clearSelector = () => {
    setFiltersPedidosVtex({
      almacen: '',
      pedidoVtex: '',
      pedidoERP: '',
      cliente: '',
      formaDePago: '',
      vrPedido: '',
      fechaPedido: '',
      estado: '',
    });
    setValorCampo(''); // Limpia también el campo de textoas
    
  };

  /*const handleClearDates = () => {
    formRef.current.setFieldsValue({
      date1: undefined,
      date2: undefined,
    });
  };*/

  const handleButtonClick = () => {
    clearSelector(); // Ejecuta la acción existente
    // handleClearDates(); Limpia las fechas
  };
  

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Generar Pedidos Vtex
        </h2>
        <h3>
          <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
            <i className="bi bi-filter"></i>
          </a>
          {'  '} Filtrar por:
        </h3>
        <form>
          <div className="container">
            <div className="multi-selector">
              {/* Otros filtros aquí */}
            </div>
          </div>
          <div className="container">
            <div className="multi-selector">
              <div className="row">
                <div className="col">
                  <div className="inline-components3">
                    <CampoTexto
                        placeholder="Buscar por # pedido:"
                        value={valorCampo}
                        onChange={e => setValorCampo(e.target.value)}
                    />
                  </div>
                  <div className="separador">
                    <SeleccionarFecha className="component-item" />
                    <BuscarButton className="component-item" />
                    {/*<BotonGenerar onClick={handleButtonClick} className="component-item" iconClassName="bi-stripe" title="Generar en Siesa" />*/}
                    <BuscarLimpiar
                    onClick={handleButtonClick}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {showMyMenu && <Menu2BotonesG />}

        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover ticket-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Almacén</th>
                  <th scope="col">Pedido Vtex</th>
                  <th scope="col">Pedido ERP</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Forma de Pago</th>
                  <th scope="col">V/R Pedido</th>
                  <th scope="col">Fecha Pedido</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Seleccionar Todos</th>
                </tr>
                <FilterPedidosVtex filtersPedidosVtex={filtersPedidoVtex} handleFilter={handleFilter}  handleButtonClick={handleButtonClick} />
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr>
                    <td>1</td>
                    <td>{item.almacen}</td>
                    <td>{item.pedidoVtex}</td>
                    <td>{item.pedidoERP}</td>
                    <td>{item.cliente}</td>
                    <td>{item.formaDePago}</td>
                    <td>{item.vrPedido}</td>
                    <td>{item.fechaPedido}</td>
                    <td><EstadoFactura /></td>
                    <td>
                      <CheckboxSelectodo />
                      <CheckboxGroup />
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination">
          <Pagination current={currentPage} pageSize={pageSize} onChange={handleChangePage} />
        </div>
      </div>
    </section>
  );
};

export default PedidosVtex;

