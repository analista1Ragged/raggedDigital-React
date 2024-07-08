import React, { useState, useEffect } from 'react';
import "./VerCapsulas.css";
import FilterRow from "../components/FilterRow/FilterRow";
import FormBuscar from "../components/FormBuscar/FormBuscar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu3Botones from "../components/Menu3Botones/Menu3Botones";
import { Pagination } from 'antd'; // Importa el componente de paginación de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design

const transformData = (list) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }
  return list.map(item => ({
    referencia: item[2] || '',
    descripcion: item[3] || '',
    categoria: item[4] || '',
    estado: item[5] || ''
  }));
};

const TicketTable = () => {
  const [data, setData] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [filters, setFilters] = useState({
    referencia: '',
    descripcion: '',
    categoria: '',
    estado: ''
  });
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const pageSize = 10; // Tamaño de página, ajusta según sea necesario

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

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/ecommerce/VerCapsulas" className="left" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Buscar Productos
        </h2>
        
        <FormBuscar setData={(rawData) => setData(transformData(rawData))} setSelectedMarca={setSelectedMarca} />
        <Menu3Botones marca={selectedMarca} />
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
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.referencia}</td>
                <td>{item.descripcion}</td>
                <td>{item.categoria}</td>
                <td>{item.estado}</td>
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

export default TicketTable;
