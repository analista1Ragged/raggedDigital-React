import React, { useState, useEffect, useRef } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import Menu2BotonesG from '../../components/Menu3Botones/Menu2BotonesG.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import FilterPedidosVtex from '../../components/FilterRow/FilterPedidosVtex.jsx';
import CheckboxGroup from '../../components/Checkbox/CheckboxDoble/CheckboxGroup.jsx';
import CheckboxSelectodo from '../../components/Checkbox/CheckboxDoble/CheckboxSelectodo.jsx';
import { urlapi } from '../../App';

const EstadoFactura = ({ estado }) => {
  let color, text;

  switch (estado) {
    case 'Importado':
      color = '#A0A0A0';
      text = 'Importado';
      break;
    case 'Preparando':
      color = '#FF5050';
      text = 'Preparando';
      break;
    case 'Comprometido':
      color = '#FFA500';
      text = 'Comprometido';
      break;
    case 'Facturado':
      color = '#D4B106';
      text = 'Facturado';
      break;
    default:
      color = '#87d068';
      text = 'Guía preparada';
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};

const transformData = (list) => {
  if (!Array.isArray(list)) {
    console.error('Expected an array but received:', list);
    return [];
  }

  return list.map((item, index) => ({
    item: index + 1,
    almacen: item.hostname || 'N/A',
    pedidoVtex: item.orderId || 'N/A',
    pedidoERP: '',  // No lo tienes en la respuesta JSON
    cliente: item.clientName || 'N/A',
    formaDePago: item.paymentNames || 'N/A',
    vrPedido: item.totalValue || 'N/A',
    impuestos: 'N/A',  // No lo tienes en la respuesta JSON
    fechaPedido: item.creationDate || 'N/A',
    estado: item.status || 'N/A',
    generarPedidoERP: 'N/A',  // No lo tienes en la respuesta JSON
  }));
};

const PedidosVtex = () => {
  const [filtersPedidoVtex, setFiltersPedidosVtex] = useState({
    almacen: '',
    pedidoVtex: '',
    pedidoERP: '',
    cliente: '',
    formaDePago: '',
    vrPedido: '',
    impuestos: '',
    fechaPedido: '',
    estado: '',
    generarPedidoERP: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);  // Datos que vienen de la API
  const [loading, setLoading] = useState(true);  // Estado para el indicador de carga
  const formRef = useRef();
  const [showMyMenu, setShowMyMenu] = useState(true);

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // Establecer el estado de carga a verdadero
        const response = await fetch(`${urlapi}/get-orders`);  // Cambia esta URL a la del backend Flask
        const result = await response.json();
        console.log(result);
        const transformedData = transformData(result.list);  // Asegúrate de que result.list es el array de datos
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);  // Establecer el estado de carga a falso
      }
    };

    fetchData();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

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
  const currentItems = data
    .filter((item) =>
      item.almacen.toLowerCase().includes(filtersPedidoVtex.almacen.toLowerCase()) &&
      item.pedidoVtex.toLowerCase().includes(filtersPedidoVtex.pedidoVtex.toLowerCase()) &&
      item.pedidoERP.toLowerCase().includes(filtersPedidoVtex.pedidoERP.toLowerCase()) &&
      item.cliente.toLowerCase().includes(filtersPedidoVtex.cliente.toLowerCase()) &&
      item.formaDePago.toLowerCase().includes(filtersPedidoVtex.formaDePago.toLowerCase()) &&
      item.vrPedido.toLowerCase().includes(filtersPedidoVtex.vrPedido.toLowerCase()) &&
      item.impuestos.toLowerCase().includes(filtersPedidoVtex.impuestos.toLowerCase()) &&
      item.fechaPedido.toLowerCase().includes(filtersPedidoVtex.fechaPedido.toLowerCase()) &&
      (typeof item.estado === 'string'
        ? item.estado.toLowerCase()
        : item.estado.toString()
      ).includes(filtersPedidoVtex.estado.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const clearSelector = () => {
    setFiltersPedidosVtex({
      almacen: '',
      pedidoVtex: '',
      pedidoERP: '',
      cliente: '',
      formaDePago: '',
      vrPedido: '',
      impuestos: '',
      fechaPedido: '',
      estado: '',
      generarPedidoERP: '',
    });
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
        <form>
          <div className="container">
            <div className="multi-selector">
              <div className="row">
                <div className="col">
                  <div className="inline-components3">
                    <CampoTexto
                      placeholder="Buscar por # pedido:"
                    />
                  </div>
                  <div className="separador">
                    <SeleccionarFecha className="component-item" />
                    <BuscarButton className="component-item" />
                    <BuscarLimpiar onClick={clearSelector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {showMyMenu && <Menu2BotonesG />}

        <div className="tabla-container">
          <div className="tabla-scroll">
            {loading ? (
              <p>Cargando datos...</p>
            ) : (
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
                    <th scope="col">Impuestos</th>
                    <th scope="col">Fecha Pedido</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Seleccionar Todos</th>
                  </tr>
                  <FilterPedidosVtex
                    filtersPedidoVtex={filtersPedidoVtex}
                    handleFilter={handleFilter}
                  />
                </thead>
                <tbody>
                  {currentItems.length > 0 ? currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.almacen}</td>
                      <td>{item.pedidoVtex}</td>
                      <td>{item.pedidoERP}</td>
                      <td>{item.cliente}</td>
                      <td>{item.formaDePago}</td>
                      <td>{item.vrPedido}</td>
                      <td>{item.impuestos}</td>
                      <td>{item.fechaPedido}</td>
                      <td>{item.estado}</td>
                      <td>
                        <CheckboxSelectodo />
                        <CheckboxGroup />
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="11">No se encontraron pedidos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
