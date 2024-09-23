import React from 'react';
// Este componente recibe dos props: filtersInventario y handleFilter
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
            value={filtersInventario[column]} //el valor correspondiente es el texto que el usuario ha ingresado en el campo de filtro para esa columna
            onChange={handleFilter}
          />
        </th>
        
      ))}
    </tr>
  );
};

export default FilterRowInventarios;