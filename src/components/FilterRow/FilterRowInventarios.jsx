import React from 'react';

const FilterRowInventarios = ({ filtersInventario, handleFilter}) => {
  const columns = ['coleccion', 'referencia','linea','descripcion','color', 'talla','cantDisponible'];

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
            value={filtersInventario[column]}
            onChange={handleFilter}
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRowInventarios;