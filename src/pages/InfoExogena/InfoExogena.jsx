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
import CampoTextoReferencia from 'src/components/CampoTexto/CampoTextoReferencia.jsx';
import CheckboxPerfiles from 'src/components/CheckboxPefiles/CheckboxPerfiles';
import BuscarButton from 'src/components/BotonBuscar/BotonBuscar.jsx';
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';
import { TbHandClick } from "react-icons/tb";
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';


const { Option } = Select;
const InfoExogena    = () => {
  const [tablaDatos, setTablaDatos] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  const [periodoI, setPeriodoI] = useState("");
  const [periodoF, setPeriodoF] = useState("");
  const [check, setCheck] = useState(false);
  const [cuentaAux, setCuentaAux] = useState("");
  const [tercero, setTercero] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Función para obtener los periodos del endpoint
  const fetchPeriodos = async () => {
    try {
      Swal.fire({
        title: 'Cargando opciones',
        //text: 'Por favor espera...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
        const response = await fetch(`${urlapi}/exogena/get-periodos`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const r = await response.json();
        const data = r
        Swal.close();
        console.log("Datos recibidos del backend:", data); // Verificar estructura

        if (Array.isArray(data) && data.length > 0) {
          const options = data
              .filter(item => item?.Periodo) // Filtrar solo los que tienen nombre
              .map(item => ({
                  label: item.Periodo,
                  value: item.Periodo
              }));
          setPeriodos(options);
          console.log("Opciones en MultiSelector después de cargar:", options);} 
          else {console.error("Formato de datos incorrecto o vacío:", data);}
   
    } catch (error) {
        console.error("Error al obtener marketplaces:", error);
        Swal.close();
    }
};

useEffect(() => {
  fetchPeriodos();
  console.log(periodos,typeof(periodos));
}, []);


const handleCheck = () => {
  setCheck(!check);
  console.log(periodoI,periodoF,check);
};
const handleCuentaAux = (e) => {
  setCuentaAux(e.target.value); // Actualiza el valor del campo de texto
};
const handleTercero = (e) => {
  setTercero(e.target.value); // Actualiza el valor del campo de texto
};

const traerTabla = async (event) => {
  if (event) event.preventDefault();
  console.log(periodoI,periodoF,check,cuentaAux,tercero);

  if (periodoI != "" && periodoF != "" && cuentaAux != "") {
    try {
      Swal.fire({
            title: 'Cargando Datos',
            text: 'Por favor espera...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
      const response = await fetch(`${urlapi}/exogena/get-reporte`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            cuentaAux,
            periodoI,
            periodoF,
            check,
            tercero,
          ],
        }),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const result = await response.json();
      console.log("Datos recibidos:", result);

      // Verifica que la respuesta tenga datos y el orden de columnas
      if (result.data && result.data.length > 0 && result.column_order) {
        
        //setTableData(result.data); // Guardar los datos en el estado
        //setTableHeaders(result.column_order);  // Usar el orden del backend
        Swal.close();
        Swal.fire({
          title: 'Reporte disponible',
          text: 'Se ha habilitado el boton para descargar reporte.',
          icon: "info",
          confirmButtonText: 'OK'
        });
      } else {
        console.warn("No se recibieron datos válidos.");
        //setTableData([]);
        //setTableHeaders([]);
        Swal.close();
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se encontraron datos con los filtros seleccionados.',
            });
    };

  } else {
    Swal.fire({
          icon: 'warning',
          title: 'Sin Filtros',
          text: 'Debes seleccionar Marketplace, Coleccion, Referencia y Color.',
        });
  }
};


const test = async () => {
  console.log(periodoI,periodoF,check,cuentaAux,tercero);
};

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
            <div className="campo-texto2">
            <CampoTexto 
                      placeholder="Cuenta Auxiliar:" 
                      value={cuentaAux} // Vinculado al estado
                      onChange={handleCuentaAux} 
                    />
            </div>

            <label htmlFor="marca" className="label-spacing">Periodos:</label>
            <Select
                          style={{ width: 270 }}
                          opc="0"
                          placeholder="Periodo Inicial"
                          options={periodos}
                          onChange={setPeriodoI}

                        />
            <Select
                          style={{ width: 270 }}
                          opc="0"
                          placeholder="Periodo Final"
                          options={periodos}
                          onChange={setPeriodoF}

                        />

            <label>
              <input
                type="checkbox"
                //checked={checked} // El valor depende de la prop `checked`
                onChange={handleCheck} // Maneja los cambios al hacer clic
              />
            </label>

            <label htmlFor="marca" className="label-spacing">Acumulado</label>
            </div>
            </div>
          </div>
          
        <div className="col-12 col-md-5">
            <div className="inline-components2">

              <CampoTexto 
                        placeholder="Terceros:" 
                        value={tercero} // Vinculado al estado
                        onChange={handleTercero} 
              />
        
            
              <BuscarButton 
                onClick={traerTabla}
              />
              <BotonDescargar 
                onClick={test}
              />
            </div>
          </div>  
        
        </form>
        <table className="table table-striped table-hover">
        <tbody>
            <tr>
              <td colSpan="9">
                <TbHandClick style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                Ingrese los diferentes filtros para mostrar datos.
              </td>
            </tr>
        </tbody>
        </table> 
      </div>
    </section>
  );
};

export default InfoExogena;