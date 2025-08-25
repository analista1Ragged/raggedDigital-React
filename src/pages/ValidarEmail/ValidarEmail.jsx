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
  try {
    console.log("🌐 Solicitando datos a:", `${urlapi}/api/get-validar-email`);
    const response = await fetch(`${urlapi}/api/get-validar-email`);
    
    console.log("📋 Status:", response.status);
    
    // Ver la respuesta como texto primero
    const textResponse = await response.text();
    console.log("📦 Respuesta cruda:", textResponse);
    
    // Luego intentar parsear como JSON
    let result;
    try {
      result = JSON.parse(textResponse);
      console.log("📦 JSON parseado:", result);
    } catch (parseError) {
      console.error("❌ Error parseando JSON:", parseError);
      throw new Error("Respuesta inválida del servidor");
    }

      // Procesar datos
      const processedData = result.data.map(item => ({
        Cédula: item.id_cliente || "N/A",
        Nombre: item.nombres || "N/A",
        Apellidos: item.apellidos || "N/A",
        Email: item.email || "N/A",
        Telefono: item.telefono || "N/A",
        Dirección: item.direccion || "N/A",
        Fecha_de_Nacimiento: item.fecha_nacimiento || "N/A"
      }));

      console.log("✅ Datos procesados:", processedData.length, "registros");
      setClientData(processedData);
      
    } catch (err) {
      console.error("❌ Error al obtener datos:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error al cargar datos",
        text: err.message || "No se pudo obtener la información",
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
          <Boton 
            onClick={exportToExcel} 
            disabled={loading || clientData.length === 0}
            style={{marginBottom: '15px'}}
          >
            📊 Generar Excel
          </Boton>
          
          <Boton 
            onClick={fetchValidarEmail} 
            disabled={loading}
            style={{marginBottom: '15px', marginLeft: '10px'}}
          >
            🔄 Actualizar
          </Boton>
        </div>

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && clientData.length > 0 && (
          <div className="summary-info">
            <p>Total de registros: <strong>{clientData.length}</strong></p>
            <p>Registros sin email: <strong>{clientData.filter(item => !item.Email || item.Email === "N/A").length}</strong></p>
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
                  <td colSpan="7" className="no-data">
                    No se encontraron registros para validar
                  </td>
                </tr>
              ) : (
                currentItems.map((cliente, index) => (
                  <tr key={index} className={!cliente.Email || cliente.Email === "N/A" ? "invalid-email" : "valid-email"}>
                    <td>{cliente.Cédula}</td>
                    <td>{cliente.Nombre}</td>
                    <td>{cliente.Apellidos}</td>
                    <td className="email-cell">{cliente.Email}</td>
                    <td>{cliente.Telefono}</td>
                    <td>{cliente.Dirección}</td>
                    <td>{cliente.Fecha_de_Nacimiento}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {!loading && clientData.length > 0 && (
          <div className='paginacion'>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={clientData.length}
              onChange={handleChangePage}
              showSizeChanger
              showQuickJumper
              pageSizeOptions={['10', '20', '50', '100']}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ValidarEmail;