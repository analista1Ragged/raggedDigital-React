import React from 'react';

const FilterRecibosCaja = ({ filtersRecibosCaja, handleFilter }) => {
  const columns = [
    { key: 'fecha_recibo', label: 'Fecha Recibo' },
    { key: 'nit', label: 'NIT' },
    { key: 'razonSocial', label: 'Razón Social' },
    { key: 'reciboDeCaja', label: 'Recibo Caja' },
    { key: 'auxiliar', label: 'Auxiliar' },
    { key: 'descripcionAuxiliar', label: 'Descripción Auxiliar' },
    { key: 'debito', label: 'Débito' },
    { key: 'credito', label: 'Crédito' },
    { key: 'dctoCruce', label: 'Dcto Cruce' },
    { key: 'fechaRecaudo', label: 'Fecha Recaudo' },
    { key: 'fechaVencimiento', label: 'Fecha Vencimiento' },
    { key: 'usuarioAprobacion', label: 'Usuario Aprobación' },
    { key: 'origen', label: 'Origen' }
  ];

  return (
    <tr id="FilterRecibosCaja">
      <th scope="col">Buscar:</th>
      {columns.map(({ key, label }) => (
        <th scope="col" key={key}>
          <input
            type="text"
            className="form-control"
            placeholder={label}
            name={key}
            value={filtersRecibosCaja[key] || ''}
            onChange={handleFilter}
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRecibosCaja;