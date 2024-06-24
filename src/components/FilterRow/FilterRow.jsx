import React from 'react';

const FilterRow = () => {
  const columns = Array.from({ length: 4 });

  return (
    <tr id="filterRow">
      <th scope="col">&nbsp;</th>
      {columns.map((_, i) => (
        <th scope="col" key={i}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por letras"
            data-column-index={i}
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRow;