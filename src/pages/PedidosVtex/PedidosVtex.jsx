import React, { useState, useMemo, useRef } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
//import MultiSelector2 from '../../components/MultiSelector/MultiSelector2.jsx';
import FilterPedidosVtex  from '../../components/FilterRow/FilterPedidosVtex.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import Menu2BotonesG from '../../components/Menu3Botones/Menu2BotonesG.jsx';
import BotonGenerar from '../../components/BotonGenerar/BotonGenerar.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import CheckboxPerfiles from '../../components/CheckboxPefiles/CheckboxPerfiles.jsx';
import CheckboxGroup from '../../components/Checkbox/CheckboxDoble/CheckboxGroup.jsx';
import CheckboxSelectodo from '../../components/Checkbox/CheckboxDoble/CheckboxSelectodo.jsx';



const EstadoFactura = ({ estado }) => {
  let color, text;

  switch (estado) {
    case "Importado":
      color = "#A0A0A0"; // Gris
      text = "Importado";
      break;
    case "Preparando":
      color = "#FF5050"; // Rojo
      text = "Preparando";
      break;
    case "Comprometido":
      color = "#FFA500"; // Naranja
      text = "Comprometido";
      break;
    case "Facturado":
      color = "#D4B106"; // Amarillo
      text = "Facturado";
      break;
    case "Guía preparada":
      color = "#87d068"; // Verde
      text = "Guía preparada";
      break;
    case "Vencido":
      color = "#FF5050"; // Rojo
      text = "Vencido";
      break;
    case "Por Vencer":
      color = "#D4B106"; // Amarillo mostaza
      text = "Por Vencer";
      break;
    default:
      color = "#87d068"; // Verde
      text = "Sin Vencer";
      break;
  }

  return (
    <Tag color={color}>
      {text}
    </Tag>
  );
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
    impuestos: item[7] || 'N/A', 
    fechaPedido: item[6] || 'N/A', 
    generarPedidoERP: item[8] || 'N/A', 
    estado: String(item[9]) || 'N/A',
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
  const [valorCampo, setValorCampo] = useState('');
  const [listaColeccion, setListaColeccion] = useState([]);
  const [listaColor, setListaColor] = useState([]);
  const [listaLinea, setListaLinea] = useState([]);
  const [selectedColecciones, setSelectedColecciones] = useState([]);
  const [selectedColores, setSelectedColores] = useState([]);
  const [selectedLineas, setSelectedLineas] = useState([]);
  const [showMyMenu, setShowMyMenu] = useState(true);
  const formRef = useRef();
  const [data, setData] = useState([]);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersPedidosVtex({
      ...filtersPedidoVtex,
      [name]: value,
    });
    setCurrentPage(1);
  };

  /*const currentItems = useMemo(() => {
    return []; // Datos simulados para visualización
  }, [currentPage, pageSize, filtersPedidoVtex]);*/


  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data
  
  .filter(item =>{
    /* Convertir item.documento a cadena si no lo es
    const documento = String(item.documento || ''); // Convertir a cadena
    const filtroDocumento = String(filtersCartera.documento || ''); // Convertir a cadena*/
    // Filtrar usando toLowerCase() y includes()
    item.almacen.toLowerCase().includes(filtersPedidoVtex.almacen.toLowerCase()) &&
    item.pedidoVtex.toLowerCase().includes(filtersPedidoVtex.pedidoVtex.toLowerCase()) &&
    item.pedidoERP.toLowerCase().includes(filtersPedidoVtex.pedidoERP.toLowerCase()) &&
    item.cliente.toLowerCase().includes(filtersPedidoVtex.cliente.toLowerCase()) &&
    item.formaDePago.toLowerCase().includes(filtersPedidoVtex.formaDePago.toLowerCase()) &&
    item.vrPedido.toLowerCase().includes(filtersPedidoVtex.vrPedido.toLowerCase()) &&
    item.impuestos.toLowerCase().includes(filtersPedidoVtex.impuestos.toLowerCase()) &&
    item.fechaPedido.toLowerCase().includes(filtersPedidoVtex.fechaPedido.toLowerCase()) &&
    item.generarPedidoERP.toLowerCase().includes(filtersPedidoVtex.generarPedidoERP.toLowerCase()) &&
    (typeof item.estado === 'string' ? item.estado.toLowerCase() : item.estado.toString()).includes(filtersPedidoVtex.estado.toLowerCase())

  })
  
  .slice(indexOfFirstItem, indexOfLastItem);


  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const manejarActualizacionValor = (e) => {
    setValorCampo(e.target.value);
  };

  const clearSelector = () => {
    setSelectedColecciones([]);
    setSelectedLineas([]);
    setSelectedColores([]);
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
    setValorCampo(''); // Limpia también el campo de texto
  };

  const handleClearDates = () => {
    formRef.current.setFieldsValue({
      date1: undefined,
      date2: undefined,
    });
  };

  const handleButtonClick = () => {
    clearSelector();
    handleClearDates();
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
                        onChange={manejarActualizacionValor}
                    />
                    </div>
                    <div className="separador">
                        <SeleccionarFecha className="component-item" />
                        <BuscarButton className="component-item" />
                        <BotonGenerar onClick={handleButtonClick} className="component-item" iconClassName="bi-stripe" title="Generar en Siesa" /> {/*aca va la funcion de generar pedidos*/}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        
        {showMyMenu && <Menu2BotonesG/>}

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
                  <th scope="col">Impuestos</th>
                  <th scope="col">Fecha Pedido</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Seleccionar</th>
                </tr>
                <FilterPedidosVtex filtersPedidoVtex={filtersPedidoVtex} handleFilter={handleFilter} handleButtonClick={handleButtonClick} />
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.almacen}</td>
                    <td>{item.pedidoVtex}</td>
                    <td>{item.pedidoERP}</td>
                    <td>{item.cliente}</td>
                    <td>{item.formaDePago}</td>
                    <td>{item.vrPedido}</td>
                    <td>{item.impuestos}</td>
                    <td>{item.fechaPedido}</td>
                    <td>{item.generarPedidoERP}</td>
                  </tr>
                ))}
                {/*<tr>
                    <td>1</td>
                    <td>107</td>
                    <td>25659</td>
                    <td>001</td>
                    <td>Rosa Palacios</td>
                    <td>Credito</td>
                    <td>108.300</td>
                    <td>17.292</td>
                    <td>19/09/2024</td>
                    <td><EstadoFactura estado={item.estado} /></td>
                    <td><CheckboxGroup/></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>107</td>
                    <td>25660</td>
                    <td>002</td>
                    <td>Juan Perez</td>
                    <td>Contraentrega</td>
                    <td>95.000</td>
                    <td>10.000</td>
                    <td>18/09/2024</td>
                    <td><EstadoFactura estado={item.estado} /></td>
                    <td><CheckboxGroup/></td>
                  </tr>*/}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={handleChangePage}
          total={currentItems.length}
        />
      </div>
    </section>
  );
};

export default PedidosVtex;
