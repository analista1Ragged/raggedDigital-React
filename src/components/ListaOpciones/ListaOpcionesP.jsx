import React from 'react';
import "./ListaOpciones.css";

const ListaOpcionesP = ({ listas = [], setSelectedBanco, selectText, label }) => {

  const handleSelectChange = (event) => {
    setSelectedBanco(event.target.value);
  };

  return (
    <div className="lista-opciones">
      <label>{label}</label>
      <select onChange={handleSelectChange}>
        <option value="" defaultValue="">{selectText}</option>
        {listas.map((lista, index) => (
          <option key={index} value={lista[0]}>{lista[1]}</option>
        ))}
      </select>
    </div>
  );
};

export default ListaOpcionesP;

