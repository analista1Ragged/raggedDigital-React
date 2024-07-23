import React from 'react';

const FilterRowCartera = ({ filtersCartera, handleFilter}) => {
  const columns = ['cedula', 'nombre', 'fecha','fechaVenc', 'nroFactura', 'valorFactura', 'valorAbono', 'diasCartera', 'nroNotaCredito', 'valorNotaCredito', 'saldoFactura'];

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
            value={filtersCartera[column]}
            onChange={handleFilter}
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRowCartera;