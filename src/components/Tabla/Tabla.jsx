import React, { useState, useEffect } from 'react';
import "./Tabla.css";
import FilterRow from '../FilterRow/FilterRow';
import FormBuscar from '../FormBuscar/FormBuscar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu3Botones from '../Menu3Botones/Menu3Botones';
import { Pagination } from 'antd'; // Importa el componente de paginación de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import ListaOpciones from '../ListaOpciones/ListaOpciones';
import CampoTexto from '../CampoTexto';
import BuscarButton from '../BotonBuscar/BotonBuscar';
import SeleccionarFecha from '../SeleccionarFecha/SeleccionarFecha'
import CheckboxForm from '../Checkbox/Checkbox';



const Tabla = () => {
  const [data, setData] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [filters, setFilters] = useState({
    referencia: '',
    descripcion: '',
    categoria: '',
    estado: ''
  });
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const [pageSize, setPageSize] = useState(10); // Tamaño de página, ajusta según sea necesario

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
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
      item.referencia.toLowerCase().includes(filters.referencia.toLowerCase()) &&
      item.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) &&
      item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
      item.estado.toLowerCase().includes(filters.estado.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/ecommerce/VerCapsulas" className="left" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Buscar Productos
        </h2>
        
        <div className="inline-components">
          <ListaOpciones className="component-item" />
          <CampoTexto className="component-item" />
          <SeleccionarFecha className="component-item" />
          <BuscarButton className="component-item" />
        </div>
          <CheckboxForm/>


        <table>
          <thead>
            <tr className="color">
              <th>Item</th>
              <th>Referencia</th>
              <th>Descripción</th>
              <th>Categoria</th>
              <th>Estado</th>
            </tr>
            <FilterRow filters={filters} handleFilterChange={handleFilterChange} />
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr>
                <td>1</td>
                <td>VESTIDO</td>
                <td>NEGRO</td>
                <td>ECOMMERCE</td>
                <td>NUEVO</td>
              </tr>
            ))}
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
      </div>
    </section>
  );
};

export default Tabla;