import React from 'react';

const FilterRow = ({ filters, handleFilterChange }) => {
  const columns = ['referencia', 'descripcion', 'categoria', 'estado', 'descripcion'];

  return (
    <tr id="filterRow">
      <th scope="col">#</th>
      {columns.map((column, i) => (
        <th scope="col" key={i}>
          <input
            type="text"
            className="form-control"
            placeholder={`Buscar por ${column}`}
            name={column}
            value={filters[column]}
            onChange={handleFilterChange}
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRow;
