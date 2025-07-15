import React, { useEffect, useState } from "react";
import "./LogsTerceros.css";
import { GiClick } from "react-icons/gi";
import { urlapi } from '../../App.js';
import Swal from "sweetalert2";

  const LogsTerceros = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagoData, setPagoData] = useState([]);

   // Función para obtener los datos del backend
    const fetchInconsistenciasClientes = async () => {
      setLoading(true);
      Swal.fire({
        title: "Cargando datos...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      try {
        const response = await fetch(urlapi + "/api/get-inconsistencias-clientes");

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
          Bodega: row[2] || "N/A",
          Cédula: row[3] || "N/A",
          Error: row[4] || "N/A",
          Tipo_Ident: row[5] || "N/A",
          Razón_Social: row[6] || "N/A",
          Apellido_1: row[7] || "N/A",
          Apellido_2: row[8] || "N/A",
          Nombres: row[9] || "N/A",
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
      fetchInconsistenciasClientes();
    }, []);

  return (
    <section className="logs-section">
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Clientes con Inconsistencias
        </h2>

        <div className="tabla-container" style={{ marginTop: "40px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Bodega</th>
                <th>Cédula</th>
                <th>Error</th>
                <th>Tipo Ident.</th>
                <th>Razón Social</th>
                <th>Apellido 1</th>
                <th>Apellido 2</th>
                <th>Nombres</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Cargando datos...</td>
                </tr>
              ) : pagoData.length === 0 ? (
                <tr>
                  <td colSpan="8">No se encontraron inconsistencias</td>
                </tr>
            ) : (
                pagoData.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente.Bodega}</td>
                    <td>{cliente.Cédula}</td>
                    <td>{cliente.Error}</td>
                    <td>{cliente.Tipo_Ident}</td>
                    <td>{cliente.Razón_Social}</td>
                    <td>{cliente.Apellido_1}</td>
                    <td>{cliente.Apellido_2}</td>
                    <td>{cliente.Nombres}</td>
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

export default LogsTerceros;


