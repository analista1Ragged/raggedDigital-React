import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./ReporteReferencias.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Boton from 'src/components/Boton/Boton';
import { urlapi } from '../../App';
import { Pagination } from 'antd'; // Importa Pagination de antd


const ReporteReferencias = () => {
  const [referencias, setReferencias] = useState([]);
  const [pluData, setPluData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para la paginación
  const [currentPageReferencias, setCurrentPageReferencias] = useState(1);
  const [pageSizeReferencias, setPageSizeReferencias] = useState(10);
  const [currentPagePlu, setCurrentPagePlu] = useState(1);
  const [pageSizePlu, setPageSizePlu] = useState(10);

  const showLoading = () => {
    Swal.fire({
      title: 'Cargando datos...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const hideLoading = () => {
    Swal.close();
  };

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  };

  useEffect(() => {
    const fetchReferencias = async () => {
      setLoading(true);
      showLoading();
      try {
        const response = await fetch(`${urlapi}/mahalo/get-referencias`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setReferencias(data[0] || []);
        setPluData(data[1] || []);
      } catch (err) {
        setError(err.message);
        showError(err.message);
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    fetchReferencias();
  }, []);

   // Manejar cambio de página para Referencias
  const handlePageChangeReferencias = (page, pageSize) => {
    setCurrentPageReferencias(page);
    setPageSizeReferencias(pageSize);
  };

  // Manejar cambio de página para Plus
  const handlePageChangePlu = (page, pageSize) => {
    setCurrentPagePlu(page);
    setPageSizePlu(pageSize);
  };

  // Filtrar datos para la página actual
  const paginatedReferencias = referencias.slice(
    (currentPageReferencias - 1) * pageSizeReferencias,
    currentPageReferencias * pageSizeReferencias
  );

  const paginatedPluData = pluData.slice(
    (currentPagePlu - 1) * pageSizePlu,
    currentPagePlu * pageSizePlu
  );

  // Función para manejar el botón "Generar"
// Función para manejar el botón "Generar"
const handleGenerar = async (event) => {
  if (event) event.preventDefault();
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
const handleExportarCSV = (event) => {
  // Prevenir la recarga de la página
  if (event) event.preventDefault();

  // Convertir un array de objetos a formato CSV con un orden específico de columnas y delimitador ;
  const convertToCSV = (data, columnOrder, includeIndex = false) => {
    return data
      .map((row, index) => {
        const rowData = columnOrder.map((key) => row[key] || "").join(";");
        return includeIndex ? `${index + 1};${rowData}` : rowData; // Agregar índice si es necesario
      })
      .join("\n"); // Combinar filas
  };

  // Descargar archivo CSV
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

  // Definir el orden de columnas para las tablas
  const referenciasColumnOrder = [
    "C_REFERENCIA",
    "F120_REFERENCIA",
    "F120_DESCRIPCION",
    "PROVEEDOR",
    "MARCA",
    "LINEA",
    "C_CATEGORIA",
    "SUBCATEGORIA",
    "SEGMENTO",
    "SECTOR",
    "COLECCION",
    "CLASIFICACION",
    "IVA",
    "PR_COMPRA",
    "PR_VENTA",
    "PR_PONDERADO",
    "PRESENTACION",
    "MAX_DCTO",
    "CAMBIA_PRECIO",
    "CATEGORIA",
    "EXPLOSION",
    "PROMOCION",
    "UBICACION",
    "UND_MEDIDA",
    "SURTIDO",
    "PR_MAXIMO",
    "DECIMAL",
    "SW_SERIAL",
    "SW_VALIDA_MAX_DCTO",
    "SW_VENTA_NEGATIVA",
  ];

  const pluDataColumnOrder = [
    "REFERENCIA",
    "BARRA",
    "C_FACTURACION",
    "TALLA",
    "C_COLOR",
  ];

  // Generar y descargar los archivos CSV
  if (referencias.length > 0) {
    const referenciasCSV = convertToCSV(referencias, referenciasColumnOrder);
    downloadCSV(referenciasCSV, "referencias.csv", 0);
  }
  if (pluData.length > 0) {
    const pluDataCSV = convertToCSV(pluData, pluDataColumnOrder, true); // Incluir índice
    downloadCSV(pluDataCSV, "plu_data.csv", 2000); // Retraso para garantizar descarga múltiple
  }
};


const handleActualizarMaestras = async (event) => {
  if (event) event.preventDefault();

  // Extraer datos de las columnas requeridas
  const referenciasStrings = referencias.map((ref) => ref.F120_REFERENCIA || "").join(",");
  const barrasStrings = pluData.map((plu) => plu.BARRA || "").join(",");

  const payload = {
    referencias: referenciasStrings,
    barras: barrasStrings,
  };

  try {
    const response = await fetch(`${urlapi}/mahalo/post-referencias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Maestras actualizadas correctamente:", result);
  } catch (error) {
    console.error("Error al actualizar las maestras:", error.message);
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
              <Boton onClick={handleActualizarMaestras}>Actualizar Maestras</Boton>
            </div>
          </div>
        </form>
        {error && <p>Error: {error}</p>}

        {/* Renderización de tablas */}
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
                {paginatedReferencias.map((ref, index) => (
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
          <Pagination
            current={currentPageReferencias}
            pageSize={pageSizeReferencias}
            total={referencias.length}
            onChange={handlePageChangeReferencias}
            showSizeChanger
            onShowSizeChange={handlePageChangeReferencias}
          />
        </div>
        <div className="tabla-container">
          <h2 className="tabla-titulo">Plus Nuevos y faltantes:</h2>
          <div className="tabla-scroll">
          <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Barra</th>
                  <th scope="col">C_Facturación</th>
                  <th scope="col">Talla</th>
                  <th scope="col">C_Color</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPluData.map((plu, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{plu.REFERENCIA}</td>
                    <td>{plu.BARRA}</td>
                    <td>{plu.C_FACTURACION}</td>
                    <td>{plu.TALLA}</td>
                    <td>{plu.C_COLOR}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
            current={currentPagePlu}
            pageSize={pageSizePlu}
            total={pluData.length}
            onChange={handlePageChangePlu}
            showSizeChanger
            onShowSizeChange={handlePageChangePlu}
          />
        </div>
          </div>
        </div>
    </section>
  );
};

export default ReporteReferencias;