import React, { useState, useEffect, useMemo } from 'react';
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
import Paginacion from 'src/components/Paginacion/Paginacion';

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
  const [tableHeaders, setTableHeaders] = useState(["Periodo", "Auxiliar", "DB", "CR", "SaldoFinal"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

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

  
  // Calcular los items a mostrar en la página actual
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return tablaFrontend.slice(start, end);
  }, [currentPage, pageSize, tablaFrontend]);


  // Función para manejar cambios de página
  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Función para obtener el reporte
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
  
      const requestData = {
        Cuenta: cuentaAux,
        PeriodoInicial: periodoI,
        PeriodoFinal: periodoF,
        Acumulado: check,
        Tercero: tercero || null
      };
  
      console.log("Enviando al backend:", requestData);
  
      const response = await fetch(`${urlapi}/exogena/get-reporte`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      console.log("Respuesta completa del backend:", data);
      
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener datos exógenos");
      }
      
      // Verificar estructura de datos
      if (!data.success || !data.data || !data.data.tabla || !data.data.excel) {
        throw new Error("Formato de respuesta inesperado del servidor");
      }
      
      // Asignar datos para la tabla
      setTablaFrontend(data.data.tabla);
      
      // Asignar datos para Excel
      setTablaExcel(data.data.excel);
      
      // Configurar headers de tabla (ya están definidos por defecto)
      
      await Swal.fire({
        title: 'Reporte exógena disponible',
        text: 'Los datos exógenos se han cargado correctamente.',
        icon: "success",
        confirmButtonText: 'OK'
      });
  
    } catch (error) {
      console.error("Error en traerReporteExogena:", error);
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
  
    try {
      // Definir el orden exacto de columnas
      const columnOrder = [
        "Periodo", "Tipo_Documento", "Cod_Tipo_Docto", "Numero_identificacion",
        "Primer_Apellido", "Segundo_Apellido", "Primer_Nombre", "Segundo_nombre",
        "Razon_social", "Cod_Pais", "Pais", "Cod_Ciudad", "Ciudad", "Auxiliar",
        "DB", "CR", "SaldoFinal"
      ];
  
      // Crear datos ordenados
      const datosOrdenados = tablaExcel.map(row => {
        const orderedRow = {};
        columnOrder.forEach(col => {
          orderedRow[col] = row[col] !== null ? row[col] : '';
        });
        return orderedRow;
      });
  
      // Crear hoja de cálculo con columnas ordenadas
      const worksheet = XLSX.utils.json_to_sheet(datosOrdenados, {
        header: columnOrder // Esto asegura el orden de columnas
      });
  
      // Ajustar el ancho de las columnas
      worksheet['!cols'] = columnOrder.map(col => ({
        wch: Math.max(
          col.length, // Ancho mínimo = longitud del nombre de la columna
          ...datosOrdenados.map(row => 
            row[col] ? String(row[col]).length : 0
          )
        )
      }));
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'ReporteExogena');
      
      // Generar nombre de archivo con fecha
      const fecha = new Date().toLocaleDateString('es-CO').replace(/\//g, '-');
      XLSX.writeFile(workbook, `Reporte_Exogena_${fecha}.xlsx`);
  
      Swal.fire({
        icon: 'success',
        title: 'Descarga exitosa',
        text: 'El archivo Excel se ha generado con el formato correcto.',
        timer: 2000
      });
    } catch (error) {
      console.error("Error al generar Excel:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un problema al generar el archivo Excel.'
      });
    }
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
              {tableHeaders.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr key={index}>
                {tableHeaders.map(header => (
                  <td key={`${index}-${header}`}>
                    {typeof row[header] === 'number' ? row[header].toLocaleString() : row[header] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Paginacion
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={tablaFrontend.length}
          onChangePage={handleChangePage}
          className="paginacion-exogena"
        />
      </div>
    </section>
  );
};

export default InfoExogena;