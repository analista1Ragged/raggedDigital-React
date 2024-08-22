import React from 'react';

const FilterRowInventarios = ({ filtersInventarios, handleFilter}) => {
  const columns = ['Marca', 'Coleccion', 'Referencia','Codigo','Color', 'Talla', 'Descripcion', 'Codigo_Barras',  'Existencia', 'Disponible', 'Comprometida'];

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