import React, { useState, useEffect } from 'react';
import "./VerCapsulas.css";
import FilterRow from "../components/FilterRow/FilterRow";
import FormBuscar from "../components/FormBuscar/FormBuscar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu3Botones from "../components/Menu3Botones/Menu3Botones";
import { Pagination } from 'antd'; // Importa el componente de paginación de Ant Design
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BotonLimpiar from "../components/BotonLimpiar/BotonLimpiar";

const transformData = (list) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }
  return list.map(item => ({
    referencia: item[2] || '',
    nombre: item[3] || '',
    categoria: item[4] || '',
    estado: item[5] || '',
    descripcion: item[6] || ''//fue reemplazado por el campo descripción
  }));
};

const TicketTable = () => {
  const [data, setData] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [selectedNombre, setSelectedNombre] = useState('');
  const [filters, setFilters] = useState({
    referencia: '',
    nombre: '',
    categoria: '',
    estado: '',
    descripcion: '' //fue reemplazado por el campo descripción
  });
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const [pageSize, setPageSize] = useState(10); // Tamaño de página, ajusta según sea necesario

  const nuevoNombre = (nuevoCodigo) => {
    setSelectedNombre(nuevoCodigo);
  };

  const nuevoMarca = (nuevoCodigo) => {
    setSelectedMarca(nuevoCodigo);
  };

  useEffect(() => {
    // Aquí puedes realizar la carga inicial de datos o configurar eventos
    // como la selección de una marca inicial si es necesario
    console.log(selectedMarca);
    fetchData(selectedMarca, selectedNombre);
  }, [selectedMarca, selectedNombre]);

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
      item.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
      item.estado.toLowerCase().includes(filters.estado.toLowerCase()) &&
      item.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) //fue reemplazado por el campo descripción
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const clearAllFields = () => {
    
    // Limpia todos los estados
    setSelectedMarca('');
    setSelectedNombre('');
    setFilters({
      referencia: '',
      nombre: '',
      categoria: '',
      estado: '',
      descripcion: '' // Limpia el campo de descripción
    });
    
    //setCurrentPage(1); // Reinicia la paginación
    //setPageSize(10); // Reinicia el tamaño de página a un valor predeterminado
 
  };

  const manejarActualizacionValor = (e) => {
    selectedNombre(e.target.value); // Actualiza el valor del campo de texto
  };

  const handleClear = (props) => {
    clearAllFields();
    // Llamar a la función limpiarCampos del componente FormBuscar
    props.limpiarCampos();
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
        <a href="/RaggedDigital/Home" className="left" title="volver">
        <i className="bi bi-arrow-left-circle"></i>
      </a>
          {'  '}
          Buscar Productos
        </h2>
        
        <FormBuscar setData={(rawData) => setData(transformData(rawData))} nuevoMarca={nuevoMarca} nuevoNombre={nuevoNombre} onClear={handleClear}/>
        <Menu3Botones marca={selectedMarca}  nombre={selectedNombre} archivo='referencias.xlsx'/>
        <table>
          <thead>
            <tr className="color">
              <th>Item</th>
              <th>Referencia</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th>Descripción</th>
            </tr>
            <FilterRow filters={filters} handleFilterChange={handleFilterChange}/>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.referencia}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.estado}</td>
                <td className="descripcion-column">{item.descripcion}</td> {/*fue reemplazado por el campo descripción*/}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='paginacion'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handleChangePage}
          showSizeChanger
          showQuickJumper
        />
        </div>
      </div>
    </section>
  );
};

export default TicketTable;
