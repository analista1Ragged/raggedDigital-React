import React, { useState, useEffect } from 'react';
import "./Tabla.css";
import FilterRowCartera from '../FilterRow/FilterRowCartera.jsx';
import FormBuscar from '../FormBuscar/FormBuscar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu2Botones from '../Menu3Botones/Menu2Botones.jsx';
import { Pagination } from 'antd'; // Importa el componente de paginación de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import ListaOpciones from '../ListaOpciones/ListaOpciones';
import CampoTexto from '../CampoTexto';
import BuscarButton from '../BotonBuscar/BotonBuscar';
import SeleccionarFecha from '../SeleccionarFecha/SeleccionarFecha';
import ModalCartera from "../ModalMenu/ModalMenu";

const transformData = (list) => {
  // Verificar si la entrada es un array
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }

  // Transformar cada elemento del array en un nuevo objeto
  return list.map(item => ({
    cedula: item[2] || '',
    nombre: item[3] || '',
    fecha: item[4] || '',
    nroFactura: item[5] || '',
    valorFactura: item[6] || '',
    fechaVenc: item[7] || '', 
    diasCartera: item[8] || '', 
    valorAbono: item[9] || '', 
    nroNotaCredito: item[10] || '', 
    valorNotaCredito: item[11] || '' 
  }));
};

const Tabla = () => {
  const [data, setData] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [filtersCartera, setFiltersCartera] = useState({
    cedula: '',
    nombre: '',
    fecha: '',
    nroFactura: '',
    valorFactura: '',
    fechaVenc: '',
    diasCartera: '',
    valorAbono: '',
    nroNotaCredito: '',
    valorNotaCredito: ''
  });
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const [pageSize, setPageSize] = useState(10); // Tamaño de página, ajusta según sea necesario
  const [modal1Visible, setModal1Visible] = useState(false); // Estado para mostrar el modal

  useEffect(() => {
    // Aquí puedes realizar la carga inicial de datos o configurar eventos
    // como la selección de una marca inicial si es necesario
    console.log(selectedMarca);
    fetchData(selectedMarca);
  }, [selectedMarca]);

  const fetchData = async (marca) => {
    try {
      const response = await fetch(`/api/data?marca=${marca}`);
      const rawData = await response.json();
      setData(transformData(rawData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersCartera({
      ...filtersCartera,
      [name]: value
    });
    // Reinicia la página actual cuando se aplica un filtro
    setCurrentPage(1);
  };

  // Lógica para obtener los datos de la página actual según los filtros y la paginación
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data
    .filter(item =>
      item.cedula.toLowerCase().includes(filtersCartera.cedula.toLowerCase()) &&
      item.nombre.toLowerCase().includes(filtersCartera.nombre.toLowerCase()) &&
      item.fecha.toLowerCase().includes(filtersCartera.fecha.toLowerCase()) &&
      item.fechaVenc.toLowerCase().includes(filtersCartera.fechaVenc.toLowerCase()) &&
      item.nroFactura.toLowerCase().includes(filtersCartera.nroFactura.toLowerCase()) &&
      item.valorFactura.toLowerCase().includes(filtersCartera.valorFactura.toLowerCase()) &&
      item.valorAbono.toLowerCase().includes(filtersCartera.valorAbono.toLowerCase()) &&
      item.diasCartera.toLowerCase().includes(filtersCartera.diasCartera.toLowerCase()) &&
      item.nroNotaCredito.toLowerCase().includes(filtersCartera.nroNotaCredito.toLowerCase()) &&
      item.valorNotaCredito.toLowerCase().includes(filtersCartera.valorNotaCredito.toLowerCase()) &&
      item.saldoFactura.toLowerCase().includes(filtersCartera.saldoFactura.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleIconClick = () => {
    setModal1Visible(true); // Muestra el modal al hacer clic en el ícono
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="Mercadeo/Raqstyle/Cartera" className="left" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Consulta Cartera RagStyle
        </h2>
        
        <div className="inline-components">
          <CampoTexto className="component-item" 
          titulo="Buscar por Nit"
          placeholder="Ingresar Nit:"
          />
          <CampoTexto className="component-item" 
          titulo="Buscar por Razon Social"
          placeholder="Ingresar Razon Social:"
          />
          <CampoTexto className="component-item" 
          titulo="Buscar por N° Factura"
          placeholder="Ingresar N° Factura:"
          />
        </div>
        <div className="inline-components2">
          <SeleccionarFecha className="component-item" 
          //placeholder="Desde" 
          />
          <BuscarButton className="component-item" />
        </div>

        <Menu2Botones marca={selectedMarca} />
        <table className="table-flex">
          <thead>
            <tr className="color">
              <th>Item</th>
              <th>Nit/Cedula</th>
              <th>Nombre/ Razon_Social</th>
              <th>Fecha de_Factura    </th>
              <th>Fecha de Vencimiento</th>
              <th>Numero de_Factura</th>
              <th>Valor de_Factura</th>
              <th>Valor del_Abono</th>
              <th>Dias de Cartera</th>
              <th>Saldo de_Factura</th>
              <th>Ver Detalle_NC</th>
            </tr>
            {/* <FilterRowCartera filtersCartera={filtersCartera} handleFilter={handleFilter} /> */}
          </thead>
          <tbody>
              <tr>
                <td>2</td>
                <td>900395854</td>
                <td>COMERCIALIZADORA S.A.S</td>
                <td>2024-07-23</td>
                <td>2024-07-23</td>
                <td>FVFE-4525</td>
                <td>10.000.000</td>
                <td>5.000.000</td>
                <td>15</td>
                <td>2.000.000</td>
                <td>
                    <button onClick={handleIconClick} className="icon-button">
                      <i className="bi bi-eye"></i>
                    </button>
                </td>
              </tr>
          </tbody>
        </table>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handleChangePage}
          showSizeChanger
          showQuickJumper
        />
        
        <ModalCartera modal1Visible={modal1Visible} setModal1Visible={setModal1Visible} />
      </div>
    </section>
  );
};

export default Tabla;
