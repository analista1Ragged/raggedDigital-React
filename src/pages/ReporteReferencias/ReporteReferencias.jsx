import React, { useState, useEffect } from 'react';
import "./ReporteReferencias.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Boton from 'src/components/Boton/Boton';
import { urlapi } from '../../App';

const ReporteReferencias = () => {
  const [referencias, setReferencias] = useState([]);
  const [pluData, setPluData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferencias = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${urlapi}/mahalo/get-referencias`); // Endpoint de Flask
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setReferencias(data[0] || []); // Primera tabla
        setPluData(data[1] || []); // Segunda tabla
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReferencias();
  }, []);

  // Función para manejar el botón "Generar"
const handleGenerar = async () => {
  setLoading(true);
  try {
    const response = await fetch(`${urlapi}/mahalo/get-referencias`); // Mismo endpoint para actualizar los datos
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    setReferencias(data[0] || []); // Actualizar tabla de referencias
    setPluData(data[1] || []); // Actualizar tabla de plus
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// Función para exportar las tablas como CSV
const handleExportarCSV = () => {
  // Convertir un array de objetos a formato CSV
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(","); // Obtener los encabezados
    const rows = data.map((row) => Object.values(row).join(",")); // Convertir cada fila
    return [headers, ...rows].join("\n"); // Combinar encabezados y filas
  };

  // Descargar archivo CSV con retraso
  const downloadCSV = (data, filename, delay = 0) => {
    setTimeout(() => {
      const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, delay);
  };

  // Generar y descargar los archivos CSV con un retraso
  // if (referencias.length > 0) {
  //   const referenciasCSV = convertToCSV(referencias);
  //   downloadCSV(referenciasCSV, "referencias.csv", 0); // Primer archivo
  // }
  if (pluData.length > 0) {
    const pluDataCSV = convertToCSV(pluData);
    downloadCSV(pluDataCSV, "plu_data.csv", 0); // Segundo archivo con un retraso de 1 segundo
  }
};


  
  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Exportar Planos Mahalo
        </h2>
        <form>
          <div className="container-2">
            <div className="row-3">
              <Boton onClick={handleGenerar}>Generar</Boton>
              <Boton onClick={handleExportarCSV}>Exportar CSV</Boton>
              <Boton>Actualizar Maestras</Boton>
            </div>
          </div>
        </form>

        {loading && <p>Cargando datos...</p>}
        {error && <p>Error: {error}</p>}

        {/* Tabla de Referencias */}
        <div className="tabla-container">
          <h2 className="tabla-titulo">Referencias:</h2>
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">C_Referencia</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Linea</th>
                  <th scope="col">C_Categoria</th>
                  <th scope="col">Subcategoria</th>
                  <th scope="col">Segmento</th>
                  <th scope="col">Sector</th>
                  <th scope="col">Colección</th>
                  <th scope="col">Clasificación</th>
                  <th scope="col">Iva</th>
                  <th scope="col">Pr_Compra</th>
                  <th scope="col">Pr_Venta</th>
                  <th scope="col">Pr_Ponderado</th>
                  <th scope="col">Presentación</th>
                  <th scope="col">Max_Dcto</th>
                  <th scope="col">Cambia_Precio</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Explosión</th>
                  <th scope="col">Promoción</th>
                  <th scope="col">Ubicación</th>
                  <th scope="col">Und_Medida</th>
                  <th scope="col">Surtido</th>
                  <th scope="col">Pr_Maximo</th>
                  <th scope="col">Decimal</th>
                  <th scope="col">Sw_Serial</th>
                  <th scope="col">Sw_Valida_Max_Dcto</th>
                  <th scope="col">Sw_Venta_Negativa</th>
                </tr>
              </thead>
              <tbody>
                {referencias.map((ref, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ref.C_REFERENCIA}</td>
                    <td>{ref.F120_REFERENCIA}</td>
                    <td>{ref.F120_DESCRIPCION}</td>
                    <td>{ref.PROVEEDOR}</td>
                    <td>{ref.MARCA}</td>
                    <td>{ref.LINEA}</td>
                    <td>{ref.C_CATEGORIA}</td>
                    <td>{ref.SUBCATEGORIA}</td>
                    <td>{ref.SEGMENTO}</td>
                    <td>{ref.SECTOR}</td>
                    <td>{ref.COLECCION}</td>
                    <td>{ref.CLASIFICACION}</td>
                    <td>{ref.IVA}</td>
                    <td>{ref.PR_COMPRA}</td>
                    <td>{ref.PR_VENTA}</td>
                    <td>{ref.PR_PONDERADO}</td>
                    <td>{ref.PRESENTACION}</td>
                    <td>{ref.MAX_DCTO}</td>
                    <td>{ref.CAMBIA_PRECIO}</td>
                    <td>{ref.CATEGORIA}</td>
                    <td>{ref.EXPLOSION}</td>
                    <td>{ref.PROMOCION}</td>
                    <td>{ref.UBICACION}</td>
                    <td>{ref.UND_MEDIDA}</td>
                    <td>{ref.SURTIDO}</td>
                    <td>{ref.PR_MAXIMO}</td>
                    <td>{ref.DECIMAL}</td>
                    <td>{ref.SW_SERIAL}</td>
                    <td>{ref.SW_VALIDA_MAX_DCTO}</td>
                    <td>{ref.SW_VENTA_NEGATIVA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla de Plus */}
        <div className="tabla-container">
          <h2 className="tabla-titulo">Plus Nuevos y faltantes:</h2>
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">C_Plu</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Barra</th>
                  <th scope="col">C_Facturación</th>
                  <th scope="col">Talla</th>
                  <th scope="col">C_Color</th>
                </tr>
              </thead>
              <tbody>
                {pluData.map((plu, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{plu.C_Plu}</td>
                    <td>{plu.Referencia}</td>
                    <td>{plu.Barra}</td>
                    <td>{plu.C_Facturación}</td>
                    <td>{plu.Talla}</td>
                    <td>{plu.C_Color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReporteReferencias;
