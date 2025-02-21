import React, { useEffect, useState } from "react";
import "./LogsTerceros.css";
import { GiClick } from "react-icons/gi";
import { urlapi } from '../../App.js';

const LogsTerceros = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`$urlapi}/api/inconsistencias-clientes`)
      .then((response) => response.json())
      .then((data) => {
        console.log(" Datos recibidos en React:", data); // Verifica la respuesta
        if (data.error) {
          console.error(data.error);
          setClientes([]);
        } else {
          setClientes(data);
        }
      })
      .catch((error) => console.error("Error al obtener datos:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
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
              ) : clientes.length === 0 ? (
                <tr>
                  <td colSpan="8">No se encontraron inconsistencias</td>
                </tr>
              ) : (
                clientes.map((cliente, index) => (
                  <tr key={index}>
                    {cliente.map((dato, i) => (
                      <td key={i}>{dato || "N/A"}</td>
                    ))}
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

