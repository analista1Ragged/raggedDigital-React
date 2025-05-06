import React from 'react';
import { FaFileInvoiceDollar, FaIdCard } from "react-icons/fa";

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
      <th scope="col"><FaFileInvoiceDollar style={{ color: 'white', fontSize: '20px', width: '24px', height: '24px' }} /></th>
      <th scope="col"><FaIdCard style={{ color: 'white', fontSize: '20px', width: '24px', height: '24px' }} /></th>
      {/*<th scope="col"></th>*/}
    </tr>
  );
};

export default FilterRowCartera;