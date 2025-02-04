import React, { useState } from "react";
import "./CupoCliente.css";
import Swal from "sweetalert2";
import BuscarButton from "src/components/BotonBuscar/BotonBuscar";
import CampoTextoReferencia from "src/components/CampoTexto/CampoTextoReferencia";
import { urlapi } from '../../App.js';
import { GiClick } from "react-icons/gi"; // Importamos el icono

// Función para buscar cliente por cédula
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
    const response = await fetch(urlapi + '/api/cliente', {
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
      APELLIDOS: data[0][2] || "N/A",
      EMAIL: data[0][3] || "N/A",
      DIRECCION: data[0][4] || "N/A",
      SUCURSAL: data[0][5] || "N/A",
      COD_CONDICION_DE_PAGO: data[0][6] || "N/A",
      CONDICION_DE_PAGO: data[0][7] || "N/A",
      CUPO_ASIGNADO: data[0][8] || "N/A",
      TOTAL_DEUDA: data[0][9] || "N/A",
      DISPONIBLE: data[0][10] || "N/A",
      BLOQUEADO: data[0][11] ? "Sí" : "No",
    };

    setClienteData(cleanedData);
  } catch (error) {
    Swal.close();
    Swal.fire("Error", "No se pudo conectar al servidor", "error");
  }
};

// El componente principal
const CupoCliente = () => {
  const [cedula, setCedula] = useState("");
  const [clienteData, setClienteData] = useState(null);

  const handleBuscarCliente = () => {
    buscarCliente(cedula, setClienteData);
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Consultar Cupo Clientes
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
                <th>Apellidos</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Sucursal</th>
                <th>Cod. Condición de Pago</th>
                <th>Condición de Pago</th>
                <th>Cupo Asignado</th>
                <th>Total Deuda</th>
                <th>Disponible</th>
                <th>Bloqueado</th>
              </tr>
            </thead>
            <tbody>
              {!clienteData && (
                <tr>
                  <td colSpan="12">
                    <GiClick style={{ marginRight: "10px", verticalAlign: "middle" }} />
                    Ingrese el numero de cedula para mostrar la informacion del cliente.
                  </td>
                </tr>
              )}
              {clienteData && (
                <tr>
                  <td>{clienteData.CEDULA}</td>
                  <td>{clienteData.NOMBRE}</td>
                  <td>{clienteData.APELLIDOS}</td>
                  <td>{clienteData.EMAIL}</td>
                  <td>{clienteData.DIRECCION}</td>
                  <td>{clienteData.SUCURSAL}</td>
                  <td>{clienteData.COD_CONDICION_DE_PAGO}</td>
                  <td>{clienteData.CONDICION_DE_PAGO}</td>
                  <td>{clienteData.CUPO_ASIGNADO}</td>
                  <td>{clienteData.TOTAL_DEUDA}</td>
                  <td>{clienteData.DISPONIBLE}</td>
                  <td>{clienteData.BLOQUEADO}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CupoCliente;













