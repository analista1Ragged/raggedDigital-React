import React from 'react';
import CheckboxSelectodo from '../Checkbox/CheckboxDoble/CheckboxSelectodo';

// Este componente recibe dos props: filtersPedidosVtex y handleFilter
const FilterPedidosVtex = ({ filtersPedidosVtex = {}, handleFilter }) => {
  const columns = ['almacen', 'pedidoVtex', 'pedidoERP', 'cliente', 'formaDePago', 'vrPedido', 'fechaPedido', 'estado Vtex', 'estado Siesa'];

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
            value={filtersPedidosVtex[column] || ''} // Si es undefined, se asigna una cadena vacía
            onChange={handleFilter}
          />
        </th>
      ))}
      <th scope="col">
        {/* Checkbox para seleccionar todo */}
        <CheckboxSelectodo />
      </th>
    </tr>
  );
};

export default FilterPedidosVtex;

