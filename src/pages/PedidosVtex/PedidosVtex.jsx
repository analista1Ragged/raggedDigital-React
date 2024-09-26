import React, { useState, useEffect, useMemo } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Tag } from 'antd';
import 'antd/dist/reset.css';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import Menu2BotonesG from '../../components/Menu3Botones/Menu2BotonesG.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import FilterPedidosVtex from '../../components/FilterRow/FilterPedidosVtex.jsx';
import CheckboxGroup from '../../components/Checkbox/CheckboxDoble/CheckboxGroup.jsx';
import { urlapi } from '../../App';
import axios from 'axios';



// Componente para mostrar el estado
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
    case 'invoiced':
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

// Función para transformar los datos
const transformData = (list) => {
  if (!Array.isArray(list)) {
    console.error('Expected an array but received:', list);
    return [];
  }

  return list.map((item, index) => ({
    id: index + 1,
    almacen: item.Almacen || 'N/A',
    pedidoVtex: item['Pedido Vtex'] || 'N/A',
    pedidoERP: item['Pedido ERP'] || 'N/A',
    cliente: item.Cliente || 'N/A',
    formaDePago: item['Forma de Pago'] || 'N/A',
    vrPedido: item['V/R Pedido'] || 'N/A',
    fechaPedido: item['Fecha Pedido'] || 'N/A',
    estado: item.Estado || 'N/A',
  }));
};

const PedidosVtex = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtersPedidoVtex, setFiltersPedidosVtex] = useState({
    almacen: '',
    pedidoVtex: '',
    pedidoERP: '',
    cliente: '',
    formaDePago: '',
    vrPedido: '',
    fechaPedido: '',
    estado: '',
  });
  const [selectedOrders, setSelectedOrders] = useState({}); // Estado para almacenar los pedidos seleccionados


  const handleGenerate = async () => {
    const selectedPedidos = currentItems.filter(item => selectedOrders[item.id]); // Filtra los pedidos seleccionados
    const pedidoVtexList = selectedPedidos.map(item => item.pedidoVtex); // Extrae solo los valores de pedidoVtex
  
    try {
      const response = await axios.post(`${urlapi}/get-orderDetail`, pedidoVtexList);
      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error sending pedidoVtexList:', error);
    }
  };
  

  // Carga de datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${urlapi}/get-orders`);
        const result = await response.json();
        
        const dataToTransform = result.list || result; 
        console.log("Datos recibidos:", dataToTransform);
        
        const transformedData = transformData(dataToTransform); 
        setData(transformedData);  
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersPedidosVtex({
      ...filtersPedidoVtex,
      [name]: value,
    });
  };

  const currentItems = useMemo(() => {
    return data.filter((item) =>
      item.almacen.toLowerCase().includes(filtersPedidoVtex.almacen.toLowerCase()) &&
      item.pedidoVtex.toLowerCase().includes(filtersPedidoVtex.pedidoVtex.toLowerCase()) &&
      item.pedidoERP.toLowerCase().includes(filtersPedidoVtex.pedidoERP.toLowerCase()) &&
      item.cliente.toLowerCase().includes(filtersPedidoVtex.cliente.toLowerCase()) &&
      item.formaDePago.toLowerCase().includes(filtersPedidoVtex.formaDePago.toLowerCase()) &&
      item.vrPedido.toLowerCase().includes(filtersPedidoVtex.vrPedido.toLowerCase()) &&
      item.fechaPedido.toLowerCase().includes(filtersPedidoVtex.fechaPedido.toLowerCase()) &&
      item.estado.toLowerCase().includes(filtersPedidoVtex.estado.toLowerCase())
    );
  }, [data, filtersPedidoVtex]);

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
    setSelectedOrders({}); // Limpiar los pedidos seleccionados
  };

  const handleCheckboxChange = (id) => {
    setSelectedOrders(prev => ({
      ...prev,
      [id]: !prev[id] // Alterna el estado del checkbox
    }));
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
                    <CampoTexto placeholder="Buscar por # pedido:" />
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

        <Menu2BotonesG onGenerate={handleGenerate} />

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
                  <th scope="col">Seleccionar</th>
                </tr>
                <FilterPedidosVtex filtersPedidosVtex={filtersPedidoVtex} handleFilter={handleFilter} />
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.almacen}</td>
                    <td>{item.pedidoVtex}</td>
                    <td>{item.pedidoERP}</td>
                    <td>{item.cliente}</td>
                    <td>{item.formaDePago}</td>
                    <td>{item.vrPedido}</td>
                    <td>{item.fechaPedido}</td>
                    <td><EstadoFactura estado={item.estado} /></td>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!selectedOrders[item.id]}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination no se ha definido, puedes agregarlo si lo necesitas */}
      </div>
    </section>
  );
};

export default PedidosVtex;
