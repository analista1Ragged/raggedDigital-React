import React from 'react';
import { FaFileInvoiceDollar, FaIdCard } from "react-icons/fa";

const FilterRecibosCaja = ({ filtersRecibosCaja, handleFilter}) => {
  const columns = ['Fecha_Recibo', 'Nit', 'Razon_Social','Recibo_Caja','Auxiliar', 'Descripcion_Auxiliar', 'DB', 'CR',
'Dcto_Cruce', 'Fecha_Recaudo','Fecha_Vencimiento','Usuario_Aprobación', 'Origen'];

  return (
    <tr id="FilterRecibosCaja">
      <th scope="col">Buscar:</th>
      {columns.map((column, i) => (
        <th scope="col" key={i}>
          <input
            type="text"
            className="form-control"
            placeholder={` ${column}`}
            name={column}
            value={filtersRecibosCaja[column]}
            onChange={handleFilter}
          />
        </th>
      ))}
      {/*<th scope="col"></th>*/}
    </tr>
  );
};

export default FilterRecibosCaja;