import React, { useState, useEffect } from 'react';
import "./InfoExogena.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'antd/dist/reset.css';
import { Select } from 'antd';
import { urlapi } from '../../App';
import Swal from 'sweetalert2';
import BuscarButton from 'src/components/BotonBuscar/BotonBuscar.jsx';
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import * as XLSX from "xlsx";

const { Option } = Select;

const InfoExogena = () => {
  const [periodos, setPeriodos] = useState([]);
  const [periodoI, setPeriodoI] = useState("");
  const [periodoF, setPeriodoF] = useState("");
  const [check, setCheck] = useState(false);
  const [cuentaAux, setCuentaAux] = useState("");
  const [tercero, setTercero] = useState("");
  const [tablaFrontend, setTablaFrontend] = useState([]);
  const [tablaExcel, setTablaExcel] = useState([]);

  // Función para manejar cambios en los inputs
  const handleChange = (setter) => (e) => setter(e.target.value);

  // Función para obtener los periodos del endpoint
  const fetchPeriodos = async () => {
    try {
      Swal.fire({
        title: 'Cargando opciones',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await fetch(`${urlapi}/exogena/get-periodos`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const r = await response.json();
      Swal.close();
      console.log("Datos recibidos del backend:", r);

      if (Array.isArray(r) && r.length > 0) {
        const options = r
          .filter(item => item?.Periodo)
          .map(item => ({
            label: item.Periodo,
            value: item.Periodo
          }));
        setPeriodos(options);
      } else {
        console.error("Formato de datos incorrecto o vacío:", r);
      }
    } catch (error) {
      console.error("Error al obtener periodos:", error);
      Swal.close();
    }
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  // Función para manejar el checkbox
  const handleCheck = () => {
    setCheck(!check);
  };

  // Función para obtener los datos de la API
  const fetchDataForExogena = async () => {
    const exo = [cuentaAux, periodoI, periodoF, check, tercero];
  
    try {
      const response = await fetch(`${urlapi}/TraerTablaExogena`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: exo })
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      console.log("Respuesta de la API:", data);
  
      if (Array.isArray(data)) {
        setTablaFrontend(data);
        setTablaExcel(data);
      } else {
        console.error('Error: La API no devolvió un array válido.', data);
        setTablaFrontend([]);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al obtener los datos. Por favor, inténtelo de nuevo.'
      });
    }
  };

  // Función para manejar la búsqueda
  const TraerTablaExogena = async () => {
    Swal.fire({
      title: 'Cargando Datos...',
      text: 'Por favor, espere mientras se cargan los datos.',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    try {
      await fetchDataForExogena();
    } finally {
      Swal.close();
    }
  };

  // Función para descargar el reporte en Excel
  const descargarReporte = async () => {
    if (tablaExcel.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay datos para descargar',
        text: 'Por favor, realice una búsqueda antes de descargar el reporte.',
      });
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(tablaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    XLSX.writeFile(workbook, 'reporteInfoExogena.xlsx');
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Reporte Exógena Contabilidad
        </h2>
        <h3>
          <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
            <i className="bi bi-filter"></i>
          </a>
          {'  '} Filtrar por:
        </h3>
        <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
          <div className="row align-items-end">
            <div className="col-12 col-md-5">
              <div className="contenedor-flex">
                <div className="campo-texto2">
                  <CampoTexto
                    placeholder="Cuenta Auxiliar:"
                    value={cuentaAux}
                    onChange={handleChange(setCuentaAux)}
                  />
                </div>

                <label htmlFor="marca" className="label-spacing">Periodos:</label>
                <Select
                  style={{ width: 270 }}
                  placeholder="Periodo Inicial"
                  options={periodos}
                  onChange={setPeriodoI}
                />
                <Select
                  style={{ width: 270 }}
                  placeholder="Periodo Final"
                  options={periodos}
                  onChange={setPeriodoF}
                />

                <label>
                  <input
                    type="checkbox"
                    checked={check}
                    onChange={handleCheck}
                  />
                  Acumulado
                </label>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="inline-components2">
              <CampoTexto
                placeholder="Terceros:"
                value={tercero}
                onChange={handleChange(setTercero)}
              />

              <BuscarButton onClick={TraerTablaExogena} />
              <BotonDescargar onClick={descargarReporte} />
            </div>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Auxiliar</th>
              <th>DB</th>
              <th>CR</th>
              <th>SaldoFinal</th>
            </tr>
          </thead>
          <tbody>
            {tablaFrontend.map((row, index) => (
              <tr key={index}>
                <td>{row.Periodo}</td>
                <td>{row.Auxiliar}</td>
                <td>{row.DB}</td>
                <td>{row.CR}</td>
                <td>{row.SaldoFinal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InfoExogena;