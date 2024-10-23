import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ListaOpciones.css";
import { urlapi } from '../../App';

const ListaOpciones = ({ setSelectedBanco }) => {
  //const [bancos, setBancos] = useState([]);
   useEffect(() => {
     const fetchBancos = async () => {
       try {
         const response = await axios.get(urlapi+'/get-bancos');
         // Verificar que la respuesta tenga datos y sea un array
         if (Array.isArray(response.data)) {
           // Filtrar y limpiar los datos para eliminar NaN (si es necesario)
           const bancos = response.data.filter(banco => Array.isArray(banco) && banco.length === 3);
           //setBancos(bancos); // Establecer los bancos como una lista de listas
           console.log(bancos);
         } else {
           //console.error("La respuesta no es un array válido:", response.data);
           //setBancos([]); // En caso de que la respuesta no sea un array válido, establecer bancos como un array vacío
         }
       } catch (error) {
         console.error("Error al obtener bancos:", error);
         //setBancos([]); // En caso de error, establecer bancos como un array vacío
       }
     };
     fetchBancos();
   }, []);
  

  const handleSelectChange = (event) => {
    setSelectedBanco(event.target.value);
  };

  return ( 
    <div className="lista-opciones">
      <label>Seleccionar un banco</label>
      <select onChange={handleSelectChange}>
        <option value="" defaultValue="">Seleccionar un banco</option>
        <option value="002"  defaultValue="1" >Occidente</option>
        <option value="003"  defaultValue="2" >Bogota</option>
        <option value="001"  defaultValue="3" >Bancolombia</option>
        <option value="004"  defaultValue="4" >Davivienda</option>
      </select>
    </div>
  );
};

export default ListaOpciones;
