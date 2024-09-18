import React, { useState, useMemo, useRef } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import MultiSelector2 from '../../components/MultiSelector/MultiSelector2.jsx';
import FilterRowInventarios from '../../components/FilterRow/FilterRowInventarios.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import Menu2Botones from '../../components/Menu3Botones/Menu2Botones.jsx';

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
  const [filtersInventario, setFiltersInventarios] = useState({
    coleccion: '',
    referencia: '',
    linea: '',
    descripcion: '',
    color: '',
    talla: '',
    cantDisponible: '',
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

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersInventarios({
      ...filtersInventario,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const currentItems = useMemo(() => {
    return []; // Datos simulados para visualización
  }, [currentPage, pageSize, filtersInventario]);

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
    setFiltersInventarios({
      coleccion: '',
      referencia: '',
      linea: '',
      descripcion: '',
      color: '',
      talla: '',
      cantDisponible: '',
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
              <div className="row-3">
                <MultiSelector2
                  options={listaColeccion}
                  opc="0"
                  placeholder="Filtrar por Colección:"
                  onSelectChange={setSelectedColecciones}
                  value={selectedColecciones}
                />
                <MultiSelector2
                  options={listaColor}
                  opc="0"
                  placeholder="Filtrar por Color:"
                  onSelectChange={setSelectedColores}
                  value={selectedColores}
                />
                <MultiSelector2
                  options={listaLinea}
                  opc="0"
                  placeholder="Filtrar por Linea:"
                  onSelectChange={setSelectedLineas}
                  value={selectedLineas}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="multi-selector">
              <div className="row">
                <div className="col">
                  <div className="inline-components2">
                    <CampoTexto
                      placeholder="Ingrese ref: PF32111310,PF31310669..."
                      value={valorCampo}
                      onChange={manejarActualizacionValor}
                    />
                    <BuscarButton className="component-item" />
                    <BuscarLimpiar onClick={handleButtonClick} className="component-item" />
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
                  <th scope="col">Colección</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Linea</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Color</th>
                  <th scope="col">Talla</th>
                  <th scope="col">Cant Disponible</th>
                </tr>
                <FilterRowInventarios filtersInventario={filtersInventario} handleFilter={handleFilter} handleButtonClick={handleButtonClick} />
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
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
                ))}
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
