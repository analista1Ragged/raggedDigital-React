import React, { useState } from 'react';
import "./VerCapsulas.css";
import FilterRow from "../components/FilterRow/FilterRow";
import FormBuscar from "../components/FormBuscar/FormBuscar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu3Botones from "../components/Menu3Botones/Menu3Botones";

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredData = data.filter(item => {
    return (
      item.referencia.toLowerCase().includes(filters.referencia.toLowerCase()) &&
      item.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) &&
      item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
      item.estado.toLowerCase().includes(filters.estado.toLowerCase())
    );
  });

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/home" className="left" title="Volver"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Buscar Productos
        </h2>
        <Menu3Botones marca={selectedMarca} />
        <FormBuscar setData={(rawData) => setData(transformData(rawData))} setSelectedMarca={setSelectedMarca} />
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.referencia}</td>
                <td>{item.descripcion}</td>
                <td>{item.categoria}</td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TicketTable;

