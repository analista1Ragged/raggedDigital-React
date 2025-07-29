import React, { useState } from "react";
import "./CupoCliente.css";
import Swal from "sweetalert2";
import BuscarButton from "src/components/BotonBuscar/BotonBuscar";
import CampoTextoReferencia from "src/components/CampoTexto/CampoTextoReferencia";
import { urlapi } from '../../App.js';
import { GiClick } from "react-icons/gi";

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

    const result = await response.json();
    Swal.close();

    if (!response.ok) {
      Swal.fire("Error", result.error || "Ocurrió un error inesperado", "error");
      return;
    }

    const responseData = result.data || result;

    // Si es un array de arrays (varios registros)
    if (Array.isArray(responseData) && responseData.length > 0 && Array.isArray(responseData[0])) {
      const cleanedDataArray = responseData.map((item) => ({
        CEDULA: item[2]?.trim() || "N/A",
        NOMBRE: item[3] || "N/A",
        APELLIDOS: item[4] || "N/A",
        EMAIL: item[5] || "N/A",
        DIRECCION: item[6] || "N/A",
        SUCURSAL: item[7] || "N/A",
        COD_CONDICION_DE_PAGO: item[8] || "N/A",
        CONDICION_DE_PAGO: item[9] || "N/A",
        CUPO_ASIGNADO: item[10] || "N/A",
        TOTAL_DEUDA: item[11] || "N/A",
        DISPONIBLE: item[12] || "N/A",
        BLOQUEADO: item[13] ? "Sí" : "No",
      }));
      setClienteData(cleanedDataArray);
    } 
    // Si es un solo objeto
    else if (typeof responseData === 'object' && responseData !== null) {
      const cleanedData = {
        CEDULA: responseData.documento?.trim() || responseData.cedula?.trim() || "N/A",
        NOMBRE: responseData.nombre || "N/A",
        APELLIDOS: responseData.apellidos || "N/A",
        EMAIL: responseData.email || "N/A",
        DIRECCION: responseData.direccion || "N/A",
        SUCURSAL: responseData.sucursal || "N/A",
        COD_CONDICION_DE_PAGO: responseData.cod_condicion_pago || "N/A",
        CONDICION_DE_PAGO: responseData.condicion_pago || "N/A",
        CUPO_ASIGNADO: responseData.cupo_asignado || "N/A",
        TOTAL_DEUDA: responseData.total_deuda || "N/A",
        DISPONIBLE: responseData.disponible || "N/A",
        BLOQUEADO: responseData.bloqueado ? "Sí" : "No",
      };
      setClienteData([cleanedData]); // Convertimos en array para renderizar igual
    } else {
      Swal.fire("Error", "Formato de datos no reconocido", "error");
    }
  } catch (error) {
    Swal.close();
    Swal.fire("Error", "No se pudo conectar al servidor", "error");
    console.error("Error al buscar cliente:", error);
  }
};

// Componente principal
const CupoCliente = () => {
  const [cedula, setCedula] = useState("");
  const [clienteData, setClienteData] = useState([]);

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
              {clienteData.length > 0 ? (
                clienteData.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente.CEDULA}</td>
                    <td>{cliente.NOMBRE}</td>
                    <td>{cliente.APELLIDOS}</td>
                    <td>{cliente.EMAIL}</td>
                    <td>{cliente.DIRECCION}</td>
                    <td>{cliente.SUCURSAL}</td>
                    <td>{cliente.COD_CONDICION_DE_PAGO}</td>
                    <td>{cliente.CONDICION_DE_PAGO}</td>
                    <td>{cliente.CUPO_ASIGNADO}</td>
                    <td>{cliente.TOTAL_DEUDA}</td>
                    <td>{cliente.DISPONIBLE}</td>
                    <td>{cliente.BLOQUEADO}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">
                    <GiClick style={{ marginRight: "10px", verticalAlign: "middle" }} />
                    Ingrese el número de cédula para mostrar la información del cliente.
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

export default CupoCliente;














