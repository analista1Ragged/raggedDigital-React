import React, { useState, useEffect } from 'react';
import "./InfoExogena.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import { urlapi } from '../../App';
import Swal from 'sweetalert2';
import Boton from 'src/components/Boton/Boton';
import * as XLSX from "xlsx";
import CampoTextoReferencia from 'src/components/CampoTexto/CampoTextoReferencia.jsx';
import CheckboxPerfiles from 'src/components/CheckboxPefiles/CheckboxPerfiles';
import BuscarButton from 'src/components/BotonBuscar/BotonBuscar.jsx';
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';


const { Option } = Select;
const InfoExogena    = () => {
  const [tablaDatos, setTablaDatos] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Función para obtener los periodos del endpoint
  const fetchPeriodos = async () => {
    try {
      const response = await fetch(`${urlapi}/nomina/get-RepDane`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const textData = await response.text();
      const cleanedData = textData.replace(/NaN/g, "null");
      const data = JSON.parse(cleanedData);
      
      const filteredPeriodos = data
        .flatMap(row => row.filter(item => item !== null && !isNaN(item)))
        .map(item => String(item));
      
      setPeriodos(filteredPeriodos);
    } catch (error) {
      console.error('Error al obtener los periodos:', error);
    }
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Reporte Exógena Contabilidad
        </h2>
        <h3>
        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
            <i className="bi bi-filter"></i>
        </a>
        {'  '} Filtrar por: 
        </h3> 
        <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
          <div className="row align-items-end">
            <div className="col-12 col-md-5">
            <div className="contenedor-flex">
            <CampoTextoReferencia placeholder="Cuenta Auxiliar:" value="" onChange="" />
            <label htmlFor="marca" className="label-spacing">Periodos:</label>
            <Select style={{ width: 270 }} showSearch placeholder="Periodo Inicial" className="w-100">
                {periodos.map((periodo, index) => (
                <Option key={index} value={periodo}>
                    {periodo}
                </Option>
                ))}
            </Select>
            <Select style={{ width: 270 }} showSearch placeholder="Periodo Final" className="w-100">
                {periodos.map((periodo, index) => (
                <Option key={index} value={periodo}>
                    {periodo}
                </Option>
                ))}
            </Select>
            <CheckboxPerfiles />
            <label htmlFor="marca" className="label-spacing">Acumulado</label>
            </div>

            </div>
          </div>
          
        <div className="row">
            <div className="inline-components2">
            <CampoTextoReferencia placeholder="Tercero:" value="" onChange="" />
              <BuscarButton 
                onClick=""
              />
              <BotonDescargar 
              />
            </div>
          </div>  
        
        </form> 
      </div>
    </section>
  );
};

export default InfoExogena;