import React, { useState } from "react";
import "./CupoEmpleados.css";
import Swal from "sweetalert2";
import BuscarButton from "src/components/BotonBuscar/BotonBuscar";
import CampoTextoReferencia from "src/components/CampoTexto/CampoTextoReferencia";
import { urlapi } from '../../App.js';
import { GiClick } from "react-icons/gi"; // Importamos el icono

// Función para buscar empleado por cédula
const buscarCliente = async (cedula, setClienteData) => {
  if (!cedula) {
    Swal.fire("Debe ingresar un número de cédula para realizar la consulta");
    return;
  }

  Swal.fire({
    title: "Cargando datos...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(urlapi + '/api/cupoEmpleados', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cedula }),
    });

    const data = await response.json();

    Swal.close();

    if (!response.ok) {
      Swal.fire("Error", data.error || "Ocurrió un error inesperado", "error");
      return;
    }

    // Mapear los datos del array a un objeto
    const cleanedData = {
      CEDULA: data[0][0]?.trim() || "N/A",
      NOMBRE: data[0][1] || "N/A",
      C_COSTOS: data[0][2] || "N/A",
      HABILITADO: data[0][3] || "N/A",
    };

    setClienteData(cleanedData);
  } catch (error) {
    Swal.close();
    Swal.fire("Error", "No se pudo conectar al servidor", "error");
  }
};

// El componente principal
const CupoEmpleados = () => {
  const [cedula, setCedula] = useState("");
  const [clienteData, setClienteData] = useState(null);

  const handleBuscarCliente = () => {
    buscarCliente(cedula, setClienteData);
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/Mercadeo/Tiendas/CupoEmpleados" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Consultar Cupo Empleados
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="container">
          <div className="container">
            <div className="multi-selector">
              <div className="row">
                <div className="col">
                  <div className="inline-components3">
                    <CampoTextoReferencia
                      placeholder="Ingrese # de Cédula:"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                    <BuscarButton
                      onClick={handleBuscarCliente}
                      className="component-item"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="tabla-container">
          <table className="table">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Centro de Costos</th>
                <th>Habilitado</th>
              </tr>
            </thead>
            <tbody>
              {!clienteData && (
                <tr>
                  <td colSpan="12">
                    <GiClick style={{ marginRight: "10px", verticalAlign: "middle" }} />
                    Ingrese el numero de cedula para mostrar la informacion del empleado.
                  </td>
                </tr>
              )}
              {clienteData && (
                <tr>
                  <td>{clienteData.CEDULA}</td>
                    <td>{clienteData.NOMBRE}</td>
                    <td>{clienteData.C_COSTOS}</td>
                    <td className={clienteData.HABILITADO === "EXCEDE CUPO" ? "excede-cupo" : "no-excede-cupo"}>
                    {clienteData.HABILITADO}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CupoEmpleados;