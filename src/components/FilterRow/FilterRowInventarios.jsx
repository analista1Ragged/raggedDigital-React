import React from 'react';

const FilterRowInventarios = ({ filtersInventarios, handleFilter}) => {
  const columns = ['Coleccion', 'Referencia','Linea','Color', 'Talla','CodBarras','Disponible'];

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
            value={filtersInventarios[column]}
            onChange={handleFilter}
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRowInventarios;