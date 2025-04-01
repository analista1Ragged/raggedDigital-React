import React, { useState, useEffect } from 'react';
import "./InfoExogena.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'antd/dist/reset.css';
import { Select } from 'antd';
import { urlapi } from '../../App';
import Swal from 'sweetalert2';
import BuscarButton from 'src/components/BotonBuscar/BotonBuscar.jsx';
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import * as XLSX from "xlsx";

const { Option } = Select;

const InfoExogena = () => {
  const [periodos, setPeriodos] = useState([]);
  const [periodoI, setPeriodoI] = useState("");
  const [periodoF, setPeriodoF] = useState("");
  const [check, setCheck] = useState(false);
  const [cuentaAux, setCuentaAux] = useState("");
  const [tercero, setTercero] = useState("");
  const [tablaFrontend, setTablaFrontend] = useState([]);
  const [tablaExcel, setTablaExcel] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  // Función para manejar cambios en los inputs
  const handleChange = (setter) => (e) => setter(e.target.value);

  // Función para obtener los periodos del endpoint
  const fetchPeriodos = async () => {
    try {
      Swal.fire({
        title: 'Cargando opciones',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await fetch(`${urlapi}/exogena/get-periodos`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const r = await response.json();
      Swal.close();
      console.log("Datos recibidos del backend:", r);

      if (Array.isArray(r) && r.length > 0) {
        const options = r
          .filter(item => item?.Periodo)
          .map(item => ({
            label: item.Periodo,
            value: item.Periodo
          }));
        setPeriodos(options);
      } else {
        console.error("Formato de datos incorrecto o vacío:", r);
      }
    } catch (error) {
      console.error("Error al obtener periodos:", error);
      Swal.close();
    }
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  const handleCheck = () => {
    setCheck(!check);
  };

  // Función corregida para obtener el reporte
  const traerReporteExogena = async (event) => {
    if (event) event.preventDefault();
  
    // Validaciones frontend
    if (!cuentaAux) {
      Swal.fire('Error', 'Debes ingresar una cuenta auxiliar', 'error');
      return;
    }
  
    if (cuentaAux.length > 8) {
      Swal.fire('Error', 'La cuenta auxiliar no puede exceder 8 caracteres', 'error');
      return;
    }
  
    if (!periodoI || periodoI.length > 6) {
      Swal.fire('Error', 'Debes ingresar un período inicial válido (6 caracteres)', 'error');
      return;
    }
  
    if (!periodoF || periodoF.length > 6) {
      Swal.fire('Error', 'Debes ingresar un período final válido (6 caracteres)', 'error');
      return;
    }
  
    try {
      const loadingSwal = Swal.fire({
        title: 'Generando reporte exógena...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
  
      // Crea un objeto requestData con los datos del formulario
      const requestData = {
        Cuenta: cuentaAux,
        PeriodoInicial: periodoI,
        PeriodoFinal: periodoF,
        Acumulado: check,
        Tercero: tercero || null
      };
  
      console.log("Enviando al backend:", requestData);

      //Envía los datos al backend mediante una petición POST

      //get_reporteExogena, Esta función es el endpoint del API que recibe y procesa la solicitud:
  
      const response = await fetch(`${urlapi}/exogena/get-reporte`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      // 👇 AQUÍ ES EL MEJOR LUGAR PARA COLOCAR EL CONSOLE.LOG
      console.log("Respuesta completa:", data);  // ← Esto te mostrará la estructura exacta de los datos recibidos
      
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener datos exógenos");
      }
      
      if (Array.isArray(data.data)) {
        // Procesar todas las filas sin filtrar por col_0
        const datosParaTabla = data.data.map(item => {
          // Crear un objeto con todas las columnas disponibles
          const rowData = {};
          
          // Recorrer todas las columnas (col_0, col_1, col_2, etc.)
          data.column_order.forEach(col => {
            if (item[col]) {
              // Si la columna existe, agregamos sus propiedades al rowData
              rowData[`${col}_Periodo`] = item[col]?.Periodo || 'N/A';
              rowData[`${col}_Auxiliar`] = item[col]?.Auxiliar || 'N/A';
              rowData[`${col}_DB`] = item[col]?.DB || 0;
              rowData[`${col}_CR`] = item[col]?.CR || 0;
              rowData[`${col}_SaldoFinal`] = item[col]?.SaldoFinal || 0;
            }
          });
          
          return rowData;
        });
      
        // Para Excel podemos mantener una estructura más plana
        const datosParaExcel = data.data.flatMap(item => 
          data.column_order
            .filter(col => item[col])
            .map(col => ({
              Columna: col,
              ...item[col]
            }))
        );
      
        console.log("Todos los datos procesados:", datosParaTabla);
        console.log("Datos para Excel:", datosParaExcel);
      
        setTablaFrontend(datosParaTabla);
        setTablaExcel(datosParaExcel);
        setTableData(data.data);
        setTableHeaders(data.column_order);
      }
      
      
      await Swal.fire({
        title: 'Reporte exógena disponible',
        text: 'Los datos exógenos se han cargado correctamente.',
        icon: "success",
        confirmButtonText: 'OK'
      });
  
    } catch (error) {
      console.error("Error en traerReporteExogena:", error);
      setTableData([]);
      setTablaFrontend([]);
      setTablaExcel([]);
      
      await Swal.fire({
        title: 'Error',
        text: error.message.includes('No hay datos disponibles')
          ? 'No se encontraron registros con los criterios de búsqueda'
          : `Error: ${error.message}`,
        icon: 'error'
      });
    } finally {
      Swal.close();
    }
  };

  const descargarReporte = async () => {
  if (tablaExcel.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No hay datos para descargar',
      text: 'Por favor, realice una búsqueda antes de descargar el reporte.',
    });
    return;
  }

  // Validación adicional
  console.log("Datos a exportar:", tablaExcel);

  const worksheet = XLSX.utils.json_to_sheet(tablaExcel.slice(1));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  XLSX.writeFile(workbook, 'reporteInfoExogena.xlsx');
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
                    value={cuentaAux}
                    onChange={handleChange(setCuentaAux)}
                  />
                </div>

                <label htmlFor="marca" className="label-spacing">Periodos:</label>
                <Select
                  style={{ width: 270 }}
                  placeholder="Periodo Inicial"
                  options={periodos}
                  onChange={setPeriodoI}
                />
                <Select
                  style={{ width: 270 }}
                  placeholder="Periodo Final"
                  options={periodos}
                  onChange={setPeriodoF}
                />

                <label>
                  <input
                    type="checkbox"
                    checked={check}
                    onChange={handleCheck}
                  />
                  {'  '} Acumulado
                </label>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="inline-components2">
              <CampoTexto
                placeholder="Terceros:"
                value={tercero}
                onChange={handleChange(setTercero)}
              />

              <BuscarButton onClick={traerReporteExogena} />
              <BotonDescargar onClick={descargarReporte} />
            </div>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Columna</th>
              <th>Periodo</th>
              <th>Auxiliar</th>
              <th>DB</th>
              <th>CR</th>
              <th>SaldoFinal</th>
            </tr>
          </thead>
          <tbody>
            {tablaFrontend.flatMap((row, rowIndex) => 
              tableHeaders.map(header => (
                <tr key={`${rowIndex}-${header}`}>
                  <td>{header}</td>
                  <td>{row[`${header}_Periodo`] || 'N/A'}</td>
                  <td>{row[`${header}_Auxiliar`] || 'N/A'}</td>
                  <td>{row[`${header}_DB`] || 0}</td>
                  <td>{row[`${header}_CR`] || 0}</td>
                  <td>{row[`${header}_SaldoFinal`] || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InfoExogena;