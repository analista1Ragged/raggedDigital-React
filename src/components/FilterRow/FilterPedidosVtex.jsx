import React from 'react';
import CheckboxSelectodo from '../Checkbox/CheckboxDoble/CheckboxSelectodo';

// Este componente recibe dos props: filtersPedidosVtex y handleFilter
const FilterPedidosVtex = ({ filtersPedidosVtex = {}, handleFilter , allSelected, setAllSelected, selectedOrders, setSelectedOrders, currentItems}) => {
  const columns = ['almacen', 'pedidoVtex', 'pedidoERP', 'cliente', 'formaDePago', 'vrPedido', 'fechaPedido', 'estadoVtex', 'estadoSiesa'];
  
  const handleSelectAllChange = () => {
    const newSelectionState = !allSelected;
    setAllSelected(newSelectionState);

    // Actualiza `selectedOrders` para cada elemento en `currentItems`
    const updatedSelection = {};
    currentItems.forEach(item => {
      updatedSelection[item.id] = newSelectionState;
    });
    setSelectedOrders(updatedSelection);
  };

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
        <input
        type="checkbox"
        checked={allSelected}
        onChange={handleSelectAllChange}
      />
      </th>
    </tr>
  );
};

export default FilterPedidosVtex;

