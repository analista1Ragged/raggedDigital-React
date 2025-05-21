import React, { useEffect, useState } from "react";
import "../Tiendas/LogsTerceros.css";
import { urlapi } from '../../App.js';
import Swal from "sweetalert2";
import Boton from 'src/components/Boton/Boton';
import * as XLSX from 'xlsx';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';

const ValidarEmail = () => {
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Función para exportar a Excel
  const exportToExcel = () => {
    if (clientData.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No hay datos para exportar",
      });
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(clientData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Validación_Email");
    XLSX.writeFile(workbook, "validacion_email.xlsx");
  };

  // Función para obtener y procesar datos
  const fetchValidarEmail = async () => {
    setLoading(true);
    setError(null);
    
    Swal.fire({
      title: "Cargando datos...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await fetch(`${urlapi}/api/get-validar-email`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Error desconocido del servidor");
      }

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Formato de datos inválido");
      }

      const processedData = result.data.map(item => ({
        Cédula: item.id_cliente || "N/A",
        Nombre: item.nombres || "N/A",
        Apellidos: item.apellidos || "N/A",
        Email: item.email || "N/A",
        Telefono: item.telefono || "N/A",
        Dirección: item.direccion || "N/A",
        Fecha_de_Nacimiento: item.fecha_nacimiento || "N/A"
      }));

      setClientData(processedData);
      
    } catch (err) {
      console.error("Error al obtener datos:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  // Calcular datos paginados
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = clientData.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar cambio de página
  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    fetchValidarEmail();
  }, []);

  return (
    <section className="email-validation-container">
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Validación de Email
        </h2>

        <div className="action-buttons">
          <Boton onClick={exportToExcel} disabled={loading || clientData.length === 0}>
            Generar Excel
          </Boton>
        </div>

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="tabla-container" style={{ marginTop: "20px" }}>
          <table className="client-table">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="loading-message">
                    <i className="bi bi-arrow-repeat"></i> Cargando datos...
                  </td>
                </tr>
              ) : clientData.length === 0 ? (
                <tr>
                  <td colSpan="7">No se encontraron registros para validar</td>
                </tr>
              ) : (
                currentItems.map((cliente, index) => (
                  <tr key={index} className={!cliente.Email || cliente.Email === "N/A" ? "invalid-email" : ""}>
                    <td>{cliente.Cédula}</td>
                    <td>{cliente.Nombre}</td>
                    <td>{cliente.Apellidos}</td>
                    <td>{cliente.Email}</td>
                    <td>{cliente.Telefono}</td>
                    <td>{cliente.Dirección}</td>
                    <td>{cliente.Fecha_de_Nacimiento}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación - Solo se muestra si hay datos */}
        {!loading && clientData.length > 0 && (
          <div className='paginacion'>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={clientData.length}
              onChange={handleChangePage}
              showSizeChanger
              showQuickJumper
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ValidarEmail;