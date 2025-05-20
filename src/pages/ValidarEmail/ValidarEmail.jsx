import React, { useEffect, useState } from "react";
import "../Tiendas/LogsTerceros.css";
import { GiClick } from "react-icons/gi";
import { urlapi } from '../../App.js';
import Swal from "sweetalert2";
import Boton from 'src/components/Boton/Boton';



  const LogsTerceros = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagoData, setPagoData] = useState([]);

   // Función para obtener los datos del backend
    const fetchValidarEmail = async () => {
      setLoading(true);
      Swal.fire({
        title: "Cargando datos...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      try {
        const response = await fetch(urlapi + "/api/get-validar-email");

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
          Cédula: row[2] || "N/A",
          Nombre: row[3] || "N/A",
          Apellidos: row[4] || "N/A",
          Email: row[5] || "N/A",
          Telefono: row[6] || "N/A",
          Dirección: row[7] || "N/A",
          Fecha_de_Nacimiento: row[8] || "N/A",
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
        fetchValidarEmail();
    }, []);

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Validación de Email
        </h2>

        <div className="container-2">
            <div className="row-3">
              <Boton onClick={""}>Generar Excel</Boton>
            </div>
          </div>

        <div className="tabla-container" style={{ marginTop: "40px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha de Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Cargando datos...</td>
                </tr>
              ) : pagoData.length === 0 ? (
                <tr>
                  <td colSpan="8">No se encontraron Email</td>
                </tr>
            ) : (
                pagoData.map((cliente, index) => (
                  <tr key={index}>
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
      </div>
    </section>
  );
};

export default LogsTerceros;