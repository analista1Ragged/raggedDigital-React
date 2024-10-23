import React, { useState, useEffect, useMemo, useRef } from 'react';
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
import ListaOpcionesP from "../../components/ListaOpciones/ListaOpcionesP.jsx";

import { urlapi } from '../../App';
import axios from 'axios';
import Swal from 'sweetalert2';

const EstadoFactura = ({ estadoVtex }) => {
  let color, text;

  switch (estadoVtex) {
//Siesa
    case "Sin Importar a Siesa":
      color = '#4f5d56';
      text = "Sin Importar";
      break;
    case "Comprometido":
      color = '#FFA500';
      text = estadoVtex;
      break;
    case "Elaboracion":
      color = '#BD8989';
      text = estadoVtex;
      break;
    case "Aprobado":
      color = '#42A2C2';
      text = estadoVtex;
      break;
//Vtex
    case 'ready for handling':
      color = '#e3310e';
      text = estadoVtex;
      break;
    case "Cancelado":
      color = '#FF5050';
      text = estadoVtex;
      break;
    case "Pendiente de pago":
      color = '#FFA500';
      text = estadoVtex;
      break;
    case "Facturado":
      color = '#87d068';
      text = estadoVtex;
      break;
    case "Preparacion":
        color = '#BD8989';
        text = estadoVtex;
        break;
    case 'window-to-cancel':
        color = '#950ee3';
        text = estadoVtex;
        break;
    case 'payment-approved':
      color = '#42A2C2';
      text = estadoVtex;
      break;
    default:
      color = '#4f5d56';
      text = 'error';
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
    id: index + 1,
    almacen: item.Almacen || 'N/A',
    pedidoVtex: item['Pedido Vtex'] || 'N/A',
    pedidoERP: item['Pedido ERP'] || 'N/A',
    cliente: item.Cliente || 'N/A',
    formaDePago: item['Forma de Pago'] || 'N/A',
    vrPedido: item['V/R Pedido'] || 'N/A',
    fechaPedido: item['Fecha Pedido'] || 'N/A',
    estadoVtex: item.Estado_Vtex || 'N/A',
    estadoSiesa: item.Estado_Siesa || 'N/A',
  }));
};

const PedidosVtex = () => {
  const [valorCampo, setValorCampo] = useState('');
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
    estadoVtex: '',
    estadoSiesa: '',
    
  });
  const seleccionarFechaRef = useRef(null);
  const [selectedOrders, setSelectedOrders] = useState({});

  const handleGenerate = async () => {
    Swal.fire({
      title: `Creando pedido en Siesa...`,
      allowOutsideClick: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const selectedPedidos = currentItems.filter(item => selectedOrders[item.id]);
    const pedidoVtexList = selectedPedidos.map(item => item.pedidoVtex);
    try {
      const response = await axios.post(`${urlapi}/get-orderDetail`, pedidoVtexList);
      console.log('Response from API:', response.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      console.error('Error sending pedidoVtexList:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: `Consultando pedidos mas recientes`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        setLoading(true);
        const response = await fetch(`${urlapi}/get-orders`, []);
        const result = await response.json();
        
        const dataToTransform = result.list || result; 
        console.log("Datos recibidos:", dataToTransform);
        
        const transformedData = transformData(dataToTransform); 
        Swal.close();
        setData(transformedData);
          
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBuscarClick = async () => {
    if (seleccionarFechaRef.current) {
      const { date1, date2 } = seleccionarFechaRef.current.getDates();
  
      if (valorCampo != '') {
        Swal.fire({
          title: `Consultando pedidos de orden ${valorCampo}`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
      } else {
        if (!date1 || !date2) {
          Swal.fire({
            title: "Filtros inválidos",
            text: "Debe seleccionar un rango de fechas.",
            icon: "info"
          });
          return;
        }
  
        if (date1.isAfter(date2)) {
          Swal.fire({
            title: "Filtros inválidos",
            text: "La fecha inicial debe ser anterior o igual a la fecha final.",
            icon: "info"
          });
          return;
        }
  
        Swal.fire({
          title: `Consultando pedidos de ${date1.format('DD/MMM/YYYY')} a ${date2.format('DD/MMM/YYYY')}`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
  
        console.log('Fecha Inicial:', date1.format('YYYY-MM-DD'));
        console.log('Fecha Final:', date2.format('YYYY-MM-DD'));
      }
  
      try {
        // Solicitud con fetch
        const response = await fetch(`${urlapi}/get-orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([date1, date2, valorCampo]),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Response from API:', result);
  
        const dataToTransform = result.list || result;
        console.log("Datos recibidos:", dataToTransform);
  
        const transformedData = transformData(dataToTransform);
        Swal.close();
        setData(transformedData);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al consultar los pedidos. Intente nuevamente más tarde.",
          icon: "error"
        });
      }
    } else {
      console.log('No se ha seleccionado una fecha.');
      Swal.fire({
        title: "Filtros Invalidos",
        text: "Debe seleccionar un rango de fechas o ingresar un numero de pedido '1468170630881-01'",
        icon: "info"
      });
    }
  };
  
  
  
  

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
      item.estadoVtex.toLowerCase().includes(filtersPedidoVtex.estadoVtex.toLowerCase()) &&
      item.estadoSiesa.toLowerCase().includes(filtersPedidoVtex.estadoSiesa.toLowerCase())
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
      estadoVtex: '',
      estadoSiesa: '',
    });
    setValorCampo(''); // Limpia también el campo de texto
    setSelectedOrders({});
  };

  const handleCheckboxChange = (id) => {
    setSelectedOrders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const manejarActualizacionValor = (e) => {
    setValorCampo(e.target.value); // Actualiza el valor del campo de texto
  };

  return (
    <section className="pedidosvtex-section">
      <div className="pedidosvtex-ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="pedidosvtex-left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Generar Pedidos Vtex
        </h2>
        <form>
          <div className="pedidosvtex-container">
            <div className="pedidosvtex-multi-selector">
              
                  
                  <div style={{ display: 'flex'}}>
                  
                    <CampoTexto placeholder="Buscar por # pedido:" 
                    value={valorCampo} // Vinculado al estado
                    onChange={manejarActualizacionValor}/>
                 
                
                    <ListaOpcionesP
                    />
                  
                  
                  </div>
                  <div className="row">
                <div className="col">
                  <div className="separador">
                    <SeleccionarFecha className="component-item" ref={seleccionarFechaRef}/>
                    <BuscarButton className="component-item" onClick={handleBuscarClick} />
                    <BuscarLimpiar onClick={clearSelector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <Menu2BotonesG onGenerate={handleGenerate} />

        <div className="pedidosvtex-tabla-container">
          <div className="pedidosvtex-tabla-scroll">
          <div className="pedidosvtex-tabla-container">
          <table className="table table-striped table-hover pedidosvtex-ticket-table">
            <thead>
              <tr>
                <th scope="col" className="pedidosvtex-ticket-table3">#</th>
                <th scope="col">Almacén</th>
                <th scope="col" className="pedidosvtex-ticket-table2">Pedido Vtex</th>
                <th scope="col">Pedido ERP</th>
                <th scope="col">Cliente</th>
                <th scope="col">Forma de Pago</th>
                <th scope="col">V/R Pedido</th>
                <th scope="col">Fecha_Pedido</th>
                <th scope="col" className="pedidosvtex-ticket-table2">Estado Vtex</th>
                <th scope="col">Estado Siesa</th>
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
                  <td><EstadoFactura estadoVtex={item.estadoVtex} /></td>
                  <td><EstadoFactura estadoVtex={item.estadoSiesa} /></td>
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
        </div>
      </div>
    </section>
  );
};

export default PedidosVtex;
