import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Pagination } from "antd";
import "./PagoProveedores.css";
import { GiClick } from "react-icons/gi";
import { urlapi } from "../../App.js";
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';
import * as XLSX from "xlsx";


const PagoProveedores = () => {
  const [pagoData, setPagoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Estado para la paginación

  // Función para formatear la fecha a YYYY-MM-DD
  const formatFecha = (fecha) => {
    if (!fecha) return "N/A";
    const date = new Date(fecha);
    if (isNaN(date)) return "N/A"; // Si no es una fecha válida, retorna "N/A"
    return date.toISOString().split("T")[0]; // Extrae solo la parte de la fecha
  };

  // Función para obtener los datos del backend
  const fetchPagoProveedores = async () => {
    setLoading(true);
    Swal.fire({
      title: "Cargando datos...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(urlapi + "/api/get-pago-proveedores");
      const text = await response.text();

      console.log("🔍 Respuesta cruda del backend:", text);

      if (!response.ok) {
        throw new Error(`Error: ${text}`);
      }

      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        throw new Error("La respuesta del backend no es un array.");
      }

      const cleanedData = data.map((row) => ({
        NitTercero: row[2] || "N/A",
        RazonSocialDocumento: row[3] || "N/A",
        NitTerceroMovimiento: row[4] || "N/A",
        RazonSocialMovimiento: row[5] || "N/A",
        DctoSiesa: row[7] || "N/A",
        DctoProveedor: row[11] || "N/A",
        Fecha: formatFecha(row[8]), // Se formatea la fecha aquí
        Pago: row[12] || "N/A",
        DB: row[9] || "N/A",
        CR: row[10] || "N/A",
      }));

      console.log("✅ Datos procesados correctamente:", cleanedData);
      setPagoData(cleanedData);
    } catch (error) {
      console.error("❌ Error al obtener los pagos:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error al cargar datos",
        text: error.message || "No se pudo obtener la información.",
      });
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  useEffect(() => {
    fetchPagoProveedores();
  }, []);

  // Manejar cambio de página
const handlePageChange = (page, pageSize) => {
  setCurrentPage(page);
  setItemsPerPage(pageSize); // Actualizar el tamaño de página
};

// Calcular los datos de la página actual
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = pagoData.slice(startIndex, endIndex);

const handleExportarExcel = () => {
  if (pagoData.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "No hay datos para exportar",
    });
    return;
  }

  const ws = XLSX.utils.json_to_sheet(pagoData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pagos Proveedores");

  // Generar el archivo y descargarlo
  XLSX.writeFile(wb, "PagoProveedores.xlsx");
};

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {"  "} Pago a Proveedores {"  "}{"  "}
          <BotonDescargar onClick={handleExportarExcel}>Exportar Excel</BotonDescargar>
        </h2>
        <h3>
      <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
        <i className="bi bi-filter"></i>
      </a>
      {'  '} Filtrar por: 
    </h3>

        <div className="tabla-container" style={{ marginTop: "40px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Nit Tercero</th>
                <th>Razon Social Documento</th>
                <th>Nit Tercero Movimiento</th>
                <th>Razon Social Movimiento</th>
                <th>Dcto Siesa</th>
                <th>Dcto Proveedor</th>
                <th>Fecha</th>
                <th>Pago</th>
                <th>DB</th>
                <th>CR</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="10">
                    <GiClick style={{ marginRight: "10px", verticalAlign: "middle" }} />
                    Cargando Información...
                  </td>
                </tr>
              ) : (
                currentData.map((pago, index) => (
                  <tr key={index}>
                    <td>{pago.NitTercero}</td>
                    <td>{pago.RazonSocialDocumento}</td>
                    <td>{pago.NitTerceroMovimiento}</td>
                    <td>{pago.RazonSocialMovimiento}</td>
                    <td>{pago.DctoSiesa}</td>
                    <td>{pago.DctoProveedor}</td>
                    <td>{pago.Fecha}</td>
                    <td>{pago.Pago}</td>
                    <td>{pago.DB}</td>
                    <td>{pago.CR}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div style={{ textAlign: "left", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          total={pagoData.length}
          pageSize={itemsPerPage} // Usar el estado actualizado
          onChange={handlePageChange} // Llamar la función con la nueva firma
          pageSizeOptions={['10', '20', '30', '50', '100']}
          showSizeChanger
          showQuickJumper
        />
        </div>
      </div>
    </section>
  );
};

export default PagoProveedores;



