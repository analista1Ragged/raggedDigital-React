import React, { useState, useEffect } from 'react';
import "./EscalasPrecios.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import Boton from 'src/components/Boton/Boton';
import FiltrarBuscar from 'src/components/FiltrarBuscar/FiltrarBuscar';
import AdjuntarArchivo from "../../components/AdjuntarArchivo/AdjuntarArchivo";
import { urlapi } from '../../App';
import Swal from 'sweetalert2';


const EscalasPrecios = () => {
  const [escalaPrecio, setEscalaPrecio] = useState('');
  const [almacen, setAlmacen] = useState('');
  const [precioObsequio, setPrecioObsequio] = useState('');
  const [fileData, setFileData] = useState(null);
  const [tablaDatos, setTablaDatos] = useState([]);


  const handleFilterChange = (escala, almacen, precioObsequio) => {
    setEscalaPrecio(escala);
    setAlmacen(almacen);
    setPrecioObsequio(precioObsequio);
    console.log(escala, almacen, precioObsequio);
  };

  const handleGenerarTabla = async (event) => {
    if (event) event.preventDefault();
  
    // Validar encabezados del archivo Excel
    if (!fileData || fileData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe adjuntar un archivo válido antes de generar la tabla.",
      });
      return;
    }
    if (escalaPrecio === "" || almacen === "" || precioObsequio === "") {
      Swal.fire({
        icon: "error",
        title: "Faltan Parametros",
        text: "Debe ingresar escala de precios y Almacen.",
      });
      return;
    }
  
    const expectedHeaders = ["referencias", "precios"];
    const actualHeaders = Object.keys(fileData[0]);
  
    // Verificar si los encabezados coinciden con la estructura esperada
    const isValidStructure = expectedHeaders.every((header, index) => header === actualHeaders[index]);
  
    if (!isValidStructure) {
      Swal.fire({
        icon: "error",
        title: "Estructura de archivo inválida",
        text: `El archivo debe contener los siguientes encabezados: ${expectedHeaders.join(", ")}.`,
      });
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
  
      const response = await fetch(`${urlapi}/mahalo/get-escalas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          escalaPrecio,
          almacen,
          precioObsequio,
          fileData,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (Array.isArray(result)) {
        setTablaDatos(result);
        Swal.close();
      } else {
        console.error("El formato de respuesta no es un array:", result);
        setTablaDatos([]);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los datos.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los datos.",
      });
    }
  };
  
  
  const handleExportarCSVTabla = (event) => {
    if (event) event.preventDefault(); // Prevenir recarga de la página

    if (tablaDatos.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Sin datos',
          text: 'No hay datos en ninguna tabla para exportar.',
        });
        return;
      }
  
    // Convertir un array de objetos a formato CSV con ';' como delimitador
    const convertToCSV = (data) => {
      return data
        .map((row) =>
          [
            row.ESCALA,
            row.CODIGO,
            row.PRECIO,
            row.FECHA,
            row.PRECIO1,
            row.ALMACEN,
            row.ESTADO,
            row.IVA,
          ].join(";")
        )
        .join("\n");
    };
  
    // Descargar archivo CSV
    const downloadCSV = (data, filename) => {
      const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    // Verificar si hay datos en la tabla
    if (tablaDatos.length > 0) {
      const csvData = convertToCSV(tablaDatos); // Convertir los datos de la tabla
      downloadCSV(csvData, "escalas_precios.csv"); // Descargar el archivo CSV
    } else {
      alert("No hay datos para exportar.");
    }
  };
  

  
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Escala de Precios
        </h2> 
        <FiltrarBuscar onFilterChange={handleFilterChange}/>
        <form>
          <div className="container-2">
            <div className="row-3">
              
              <AdjuntarArchivo setFile={setFileData} />
              <Boton onClick={handleGenerarTabla}>Generar</Boton>
              <Boton onClick={handleExportarCSVTabla}>Exportar CSV</Boton>
            </div>
          </div>
        </form>
        {/* Contenedor con scroll horizontal */}
        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Escala</th>
              <th scope="col">Codigo</th>
              <th scope="col">Precio</th>
              <th scope="col">Fecha</th>
              <th scope="col">Precio1</th>
              <th scope="col">Almacen</th>
              <th scope="col">Estado</th>
              <th scope="col">Iva</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tablaDatos) && tablaDatos.length > 0 ? (
              tablaDatos.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.ESCALA}</td>
                  <td>{row.CODIGO}</td>
                  <td>{row.PRECIO}</td>
                  <td>{row.FECHA}</td>
                  <td>{row.PRECIO1}</td>
                  <td>{row.ALMACEN}</td>
                  <td>{row.ESTADO}</td>
                  <td>{row.IVA}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No hay datos disponibles.</td>
              </tr>
            )}
          </tbody>

            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EscalasPrecios;