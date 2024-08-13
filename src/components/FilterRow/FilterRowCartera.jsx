import React from 'react';

const FilterRowCartera = ({ filtersCartera, handleFilter}) => {
  const columns = ['Nit', 'Nombre', 'Fecha','#Factura','$Factura', 'FechaVenc', 'DiasCart', '$Abono', 'SaldoFactura', 'Estado'];

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
    </tr>
  );
};

export default FilterRowCartera;