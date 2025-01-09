import React, { useState, useMemo } from 'react';
import "./ReporteCostos.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import Boton from 'src/components/Boton/Boton';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { urlapi } from '../../App';
import Swal from 'sweetalert2';

const ReportesCostos = () => {
  // Estado para los costos
  const [costos, setCostos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Función para manejar el cambio de página y tamaño de página
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Obtener los elementos actuales según la página y el tamaño seleccionado
  const paginatedCostos = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return costos.slice(start, end);
  }, [currentPage, pageSize, costos]);

  // Función para generar costos
  const handleGenerarCostos = async (event) => {
    if (event) event.preventDefault();
    Swal.fire({
      title: 'Cargando Datos',
      text: 'Por favor espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setLoading(true);
    try {
      const response = await fetch(`${urlapi}/mahalo/get-costos`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setCostos(data || []); // Llenar tabla de costos
      Swal.close();
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para exportar costos a CSV
  const handleExportarCostosCSV = async (event) => {
    if (event) event.preventDefault();

    const convertToCSV = (data) => data.map((row) => `${row.REF};${row.COSTO}`).join("\n");
    const maxLines = 4950;
    const splitDataIntoChunks = (data, maxLines) => {
      const chunks = [];
      for (let i = 0; i < data.length; i += maxLines) {
        chunks.push(data.slice(i, i + maxLines));
      }
      return chunks;
    };

    try {
      const zip = new JSZip();
      const chunks = splitDataIntoChunks(costos, maxLines);
      chunks.forEach((chunk, index) => {
        const csvContent = convertToCSV(chunk);
        zip.file(`costos${index + 1}.csv`, csvContent);
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "costos_mahalo.zip");
    } catch (err) {
      console.error("Error generando el archivo ZIP:", err);
    }
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Costos Mahalo
        </h2>
        <form>
          <div className="container-2">
            <div className="row-3">
              <Boton onClick={handleGenerarCostos}>Generar Costos</Boton>
              <Boton onClick={handleExportarCostosCSV}>Exportar CSV</Boton>
            </div>
          </div>
        </form>
        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Costo</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCostos.length > 0 ? (
                  paginatedCostos.map((costo, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{costo.REF}</td>
                      <td>{costo.COSTO}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={costos.length}
            onChange={handlePaginationChange}
            pageSizeOptions={['10', '20', '30', '50', '100']}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </div>
    </section>
  );
};

export default ReportesCostos;

