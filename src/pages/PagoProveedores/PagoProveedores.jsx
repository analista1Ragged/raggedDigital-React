import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert
import "./PagoProveedores.css";
import { GiClick } from "react-icons/gi";
import { urlapi } from '../../App.js';

const PagoProveedores = () => {
  const [pagoData, setPagoData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  // Función para obtener los datos del backend
  const fetchPagoProveedores = async () => {
    setLoading(true); // Activar estado de carga
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
        Fecha: row[8] || "N/A",
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
      setLoading(false); // Finalizar estado de carga
      Swal.close(); // Cerrar el Swal de carga
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchPagoProveedores();
  }, []);

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {"  "} Pago a Proveedores
        </h2>

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
              {pagoData.length === 0 ? (
                <tr>
                  <td colSpan="10">
                    <GiClick style={{ marginRight: "10px", verticalAlign: "middle" }} />
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                pagoData.map((pago, index) => (
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
      </div>
    </section>
  );
};

export default PagoProveedores;

