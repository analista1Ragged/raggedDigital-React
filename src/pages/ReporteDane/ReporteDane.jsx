import React, { useState, useEffect } from 'react';
import "./ReporteDane.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import { urlapi } from '../../App';
import Swal from 'sweetalert2';
import Boton from 'src/components/Boton/Boton';
import * as XLSX from "xlsx";

const { Option } = Select;
const ReporteDane = () => {
  const [tablaDatos, setTablaDatos] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  // Función para obtener los periodos del endpoint
  const fetchPeriodos = async () => {
    try {
      const response = await fetch(`${urlapi}/nomina/get-RepDane`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Leer el cuerpo de la respuesta como texto
      const textData = await response.text();
      
      // Reemplazar 'NaN' con 'null' para que sea JSON válido
      const cleanedData = textData.replace(/NaN/g, "null");
      
      // Convertir el texto limpio a JSON
      const data = JSON.parse(cleanedData);
      
      // Filtrar los periodos válidos (numéricos)
      const filteredPeriodos = data
        .flatMap(row => row.filter(item => item !== null && !isNaN(item))) // Filtrar los valores válidos
        .map(item => String(item)); // Convertir a string si es necesario
      
      setPeriodos(filteredPeriodos);
    } catch (error) {
      console.error('Error al obtener los periodos:', error);
    }
  };
  

  // Llamar fetchPeriodos al cargar el componente
  useEffect(() => {
    fetchPeriodos();
  }, []);

  const handleBuscarPeriodo = async () => {
    const selectedPeriodo = document.querySelector(".ant-select-selection-item")?.innerText;
  
    if (!selectedPeriodo) {
      alert("Por favor selecciona un periodo antes de buscar.");
      return;
    }
  
    try {
      Swal.fire({
        title: "Cargando Datos",
        text: "Por favor espera...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const response = await fetch(`${urlapi}/nomina/post-RepDane`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ periodo: selectedPeriodo }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      setTablaDatos(result);
  
      Swal.close();
    } catch (error) {
      console.error("Error al obtener los datos del periodo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los datos.",
      });
    }
  };

  const handleExportarExcel = async (event) => {
    if (event) event.preventDefault();
    if (tablaDatos.length === 0) {
      alert("No hay datos en la tabla para exportar.");
      return;
    }
  
    // Filtrar las columnas necesarias (sin la columna autoincremental)
    const datosParaExportar = tablaDatos.map(
      ({
        DOCUMENTO,
        "NOMBRE EMPLEADO": nombreEmpleado,
        CARGO,
        CCOSTOS,
        SEXO,
        CO,
        UBICACION,
        OPERARIO,
        "TECNICO-TECNOLOGO": tecnicoTecnologo,
        PROFESIONAL,
        "SALARIO BASICO": salarioBasico,
        "DIAS LIQUIDADOS": diasLiquidados,
        "SALARIO DEVENGADO": salarioDevengado,
        "HORAS EXTRAS": horasExtras,
        "RECARGOS NOCTURNOS": recargosNocturnos,
        "TRABAJO DOMINICAL-FESTIVO": trabajoFestivo,
        INCAPACIDADES,
        "AUXILIO TRANSPORTE": auxilioTransporte,
        "TOTAL DEVENGADO": totalDevengado,
        SALUD1,
        PENSION1,
        "FONDO SOLIDARIDAD PENS": fondoPens,
        "RETENCION EN LA FUENTE": retencionFuente,
        "OTRAS DEDUCCIONES": otrasDeducciones,
        SALUD2,
        PENSION2,
        ARL,
        SENA,
        ICBF,
        "CAJA COMPENSACION": cajaCompensacion,
        "PRIMA DE SERVICIOS": primaServicios,
        CESANTIAS,
        "INTERESES A LAS CESANTIAS": interesesCesantias,
        VACACIONES,
      }) => ({
        DOCUMENTO,
        "NOMBRE EMPLEADO": nombreEmpleado,
        CARGO,
        CCOSTOS,
        SEXO,
        CO,
        UBICACION,
        OPERARIO,
        "TECNICO-TECNOLOGO": tecnicoTecnologo,
        PROFESIONAL,
        "SALARIO BASICO": salarioBasico,
        "DIAS LIQUIDADOS": diasLiquidados,
        "SALARIO DEVENGADO": salarioDevengado,
        "HORAS EXTRAS": horasExtras,
        "RECARGOS NOCTURNOS": recargosNocturnos,
        "TRABAJO DOMINICAL-FESTIVO": trabajoFestivo,
        INCAPACIDADES,
        "AUXILIO TRANSPORTE": auxilioTransporte,
        "TOTAL DEVENGADO": totalDevengado,
        SALUD1,
        PENSION1,
        "FONDO SOLIDARIDAD PENS": fondoPens,
        "RETENCION EN LA FUENTE": retencionFuente,
        "OTRAS DEDUCCIONES": otrasDeducciones,
        SALUD2,
        PENSION2,
        ARL,
        SENA,
        ICBF,
        "CAJA COMPENSACION": cajaCompensacion,
        "PRIMA DE SERVICIOS": primaServicios,
        CESANTIAS,
        "INTERESES A LAS CESANTIAS": interesesCesantias,
        VACACIONES,
      })
    );
  
    // Crear un libro y una hoja
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(datosParaExportar);
  
    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Dane");
  
    // Exportar el archivo
    XLSX.writeFile(workbook, "Reporte_Dane.xlsx");
  };

  return (
    <section>
      <div className="ticket-table">
      <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Reporte Nómina Dane
        </h2> 
      <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row align-items-end">
        <div className="col-12 col-md-5">
          <label htmlFor="marca" className="label-spacing">Periodo</label>
          <div>
                <Select
                  style={{ width: 350 }}
                  showSearch
                  placeholder="Selecciona un Periodo"
                  className="w-100"
                >
                  {periodos.map((periodo, index) => (
                    <Option key={index} value={periodo}>
                      {periodo}
                    </Option>
                  ))}
                </Select>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <BotonBuscar onClick={handleBuscarPeriodo} />

            
        </div>
        <div className="col-12 col-md-5">
        <Boton onClick={handleExportarExcel}>
          Exportar Excel
        </Boton>

        </div>
      </div>
    </form> 
        
        {/* Contenedor con scroll horizontal */}
        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">    
            <thead>
            <tr>
              <th colspan="8">Datos Empleado</th>
              <th colspan="3">Perfil Profesional</th>
              <th colspan="10">Devengado</th>
              <th colspan="5">Deducciones</th>
              <th colspan="3">Provisiones</th>
              <th colspan="3">Parafiscales</th>
              <th colspan="4">Prestaciones</th>
            </tr>  
            <tr>
              <th scope="col">#</th>
              <th scope="col">Documento</th>
              <th scope="col">Nombre Empleado</th>
              <th scope="col">Cargo</th>
              <th scope="col">CCostos</th>
              <th scope="col">Sexo</th>
              <th scope="col">CO</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Operario</th>
              <th scope="col">Técnico Tecnólogo</th>
              <th scope="col">Profesional</th>
              <th scope="col">Salario Básico</th>
              <th scope="col">Dias liquidados</th>
              <th scope="col">Salario Devengado</th>
              <th scope="col">Horas Extras</th>
              <th scope="col">Recargos Nocturnos</th>
              <th scope="col">Recargos Nocturnos</th>
              <th scope="col">Trabajo Dominical Festivo</th>
              <th scope="col">Incapacidades</th>
              <th scope="col">Auxilio de Transporte</th>
              <th scope="col">Total Devengado</th>
              <th scope="col">Salud</th>
              <th scope="col">Pensión</th>
              <th scope="col">Fondo Solidaridad Pens</th>
              <th scope="col">Retención en la fuente</th>
              <th scope="col">Otras deducciones</th>
              <th scope="col">Salud</th>
              <th scope="col">Pensión</th>
              <th scope="col">Arl</th>
              <th scope="col">Sena</th>
              <th scope="col">ICBF</th>
              <th scope="col">Caja de Compensación</th>
              <th scope="col">Prima de Servicios</th>
              <th scope="col">Cesantias</th>
              <th scope="col">Interees a las cesantias</th>
              <th scope="col">Vacaciones</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.DOCUMENTO}</td>
                <td>{row["NOMBRE EMPLEADO"]}</td>
                <td>{row.CARGO}</td>
                <td>{row.CCOSTOS}</td>
                <td>{row.SEXO}</td>
                <td>{row.CO}</td>
                <td>{row.UBICACION}</td>
                <td>{row.OPERARIO || "-"}</td>
                <td>{row["TECNICO-TECNOLOGO"] || "-"}</td>
                <td>{row.PROFESIONAL || "-"}</td>
                <td>{row["SALARIO BASICO"]}</td>
                <td>{row["DIAS LIQUIDADOS"]}</td>
                <td>{row["SALARIO DEVENGADO"]}</td>
                <td>{row["HORAS EXTRAS"]}</td>
                <td>{row["RECARGOS NOCTURNOS"]}</td>
                <td>{row["RECARGOS NOCTURNOS"]}</td>
                <td>{row["TRABAJO DOMINICAL-FESTIVO"]}</td>
                <td>{row.INCAPACIDADES}</td>
                <td>{row["AUXILIO TRANSPORTE"]}</td>
                <td>{row["TOTAL DEVENGADO"]}</td>
                <td>{row.SALUD1}</td>
                <td>{row.PENSION1}</td>
                <td>{row["FONDO SOLIDARIDAD PENS"]}</td>
                <td>{row["RETENCION EN LA FUENTE"]}</td>
                <td>{row["OTRAS DEDUCCIONES"]}</td>
                <td>{row.SALUD2}</td>
                <td>{row.PENSION2}</td>
                <td>{row.ARL}</td>
                <td>{row.SENA}</td>
                <td>{row.ICBF}</td>
                <td>{row["CAJA COMPENSACION"]}</td>
                <td>{row["PRIMA DE SERVICIOS"]}</td>
                <td>{row.CESANTIAS}</td>
                <td>{row["INTERESES A LAS CESANTIAS"]}</td>
                <td>{row.VACACIONES}</td>
              </tr>
            ))}
          </tbody>

            </table>
            <div className="container-2">
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReporteDane;