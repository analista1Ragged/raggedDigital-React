import React from 'react';

const FilterRowCartera = ({ filtersCartera, handleFilter}) => {
  const columns = ['documento', 'nombre', 'fecha','nroFactura','valorFactura', 'fechaVenc', 'diasCart', 'valorAbono',
'saldoFactura', 'estado'];

  return (
    <tr id="filterRowCartera">
      <th scope="col">Buscar por:</th>
      {columns.map((column, i) => (
        <th scope="col" key={i}>
          <input
            type="text"
            className="form-control"
            placeholder={` ${column}`}
            name={column}
            value={filtersCartera[column]}
            onChange={handleFilter}
          />
        </th>
      ))}
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  );
};

export default FilterRowCartera;