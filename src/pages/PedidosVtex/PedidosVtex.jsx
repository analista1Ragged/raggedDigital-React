import React, { useState, useMemo, useRef } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
//import MultiSelector2 from '../../components/MultiSelector/MultiSelector2.jsx';
import FilterPedidosVtex  from '../../components/FilterRow/FilterPedidosVtex.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import Menu2Botones from '../../components/Menu3Botones/Menu2Botones.jsx';
import BotonGenerar from '../../components/BotonGenerar/BotonGenerar.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';

const EstadoFactura = ({ quantity }) => {
  let color, text;

  if (quantity <= 20) {
    color = '#FF5050'; // Rojo
    text = `${quantity}`;
  } else if (quantity > 20 && quantity <= 30) {
    color = '#FFA500'; // Naranja
    text = `${quantity}`;
  } else {
    color = '#87d068'; // Verde
    text = `${quantity}`;
  }

  return (
    <Tag color={color}>
      {text}
    </Tag>
  );
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
                        <BotonGenerar onClick={handleButtonClick} className="component-item" /> {/*aca va la funcion de generar pedidos*/}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        
        {showMyMenu && <Menu2Botones archivo="inventario.xlsx" />}

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
                  <th scope="col">Generar pedido ERP</th>
                </tr>
                <FilterPedidosVtex filtersPedidoVtex={filtersPedidoVtex} handleFilter={handleFilter} handleButtonClick={handleButtonClick} />
              </thead>
              <tbody>
                {/*currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.coleccion}</td>
                    <td>{item.referencia}</td>
                    <td>{item.linea}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.color}</td>
                    <td>{item.talla}</td>
                    <td>{item.cantDisponible}</td>
                  </tr>
                ))*/}
                <tr>
                    <td>1</td>
                    <td>107</td>
                    <td>25659</td>
                    <td>001</td>
                    <td>Rosa Palacios</td>
                    <td>Credito</td>
                    <td>108.300</td>
                    <td>17.292</td>
                    <td>19/09/2024</td>
                    <td>En preparación</td>
                    <td scope="col">Checkbox</td>
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
                    <td>En preparación</td>
                    <td scope="col">Checkbox</td>
                  </tr>
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
