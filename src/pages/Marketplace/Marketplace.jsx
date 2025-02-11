import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import MultiSelector from '../../components/MultiSelector/MultiSelector.jsx';
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import { Select, Pagination } from 'antd'; // Importa el componente Select de Ant Design
import { TbHandClick } from "react-icons/tb";
import { urlapi } from '../../App';
import Swal from 'sweetalert2';
import './Marketplace.css';

const Marketplace = () => {
  // inicializar tablas
  const [currentPage, setCurrentPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState([]); // Estado para almacenar los datos dinámicos
  const [tableHeaders, setTableHeaders] = useState([]); // Estado para los encabezados dinámicos
  // combos
  const [marketplaces, setMarketplaces] = useState([]);
  const [marketCap, setMarketCap] = useState([]);
  const [marketRef, setMarketRef] = useState([]);
  const [marketCol, setMarketCol] = useState([]);
  const [tiposArchivo, setTiposArchivo] = useState([]);
  // seleccionados
  const [selectedMarketplace, setSelectedMarketplace] = useState(null); 
  const [selectedTipoArchivo, setSelectedTipoArchivo] = useState(null); 
  const [selectedMarketCap, setSelectedMarketCap] = useState(null); 
  const [selectedMarketRef, setSelectedMarketRef] = useState(null); 
  const [selectedMarketCol, setSelectedMarketCol] = useState(null); 
  
  // Función para obtener los datos del backend
  const fetchMarketplaces = async () => {
    try {
        const response = await fetch(`${urlapi}/Marketplace/get-ConsultarMarketplace`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const r = await response.json();
        const data = r[0]

        console.log("Datos recibidos del backend:", data); // Verificar estructura

        if (Array.isArray(data) && data.length > 0) {
          const options = data
              .filter(item => item?.Descripcion) // Filtrar solo los que tienen nombre
              .map(item => ({
                  label: item.Descripcion,
                  value: item.ProcedimientoAlmacenado
              }));
          setMarketplaces(options);
          console.log("Opciones en MultiSelector después de cargar:", options);} 
          else {console.error("Formato de datos incorrecto o vacío:", data);}

        console.log("caps:", r[1]);
        if (Array.isArray(r[1]) && r[1].length > 0) {
            const caps = r[1]
                .filter(item => item?.F106_ID) // Filtrar solo los que tienen nombre
                .map(item => ({
                    label: item.F106_DESCRIPCION,
                    value: item.F106_ID
                }));
                console.log("caps:", caps);
          setMarketCap(caps);
          console.log("Opciones en MultiSelector después de cargar:", caps);} 
          else {console.error("Formato de datos incorrecto o vacío:", r[1]);}

    } catch (error) {
        console.error("Error al obtener marketplaces:", error);
    }
};


// Cargar datos cuando el componente se monta
useEffect(() => {
  fetchMarketplaces();
  console.log(selectedMarketCap,typeof(selectedMarketCap));
}, []);

// 🔹 Obtener tipos de archivo desde el backend
const fetchTipoArchivo = async () => {
  try {
    const response = await fetch(`${urlapi}/Marketplace/get-ConsultarTipoArchivo`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    console.log("Tipos de archivo recibidos:", data);

    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter(item => item?.nombre)
        .map(item => ({ label: item.nombre, value: item.nombre }));
    } else {
      console.error("Formato incorrecto o vacío:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener tipos de archivo:", error);
    return [];
  }
};

useEffect(() => {
  if (selectedMarketplace === "Falabella") {
      fetchTipoArchivo().then(setTiposArchivo);
  } else {
      setTiposArchivo([]); // Vaciar opciones si se selecciona otro marketplace
      setSelectedTipoArchivo(null); // Resetear selección
  }
}, [selectedMarketplace]);


// Manejar selección del marketplace
const handleMarketCap = async (value) => {
  console.log(value)
  setSelectedMarketCap(value)
  setMarketRef(await fetchReferencias(value));
};
const fetchReferencias = async (value) => {
  try {
    const response = await fetch(`${urlapi}/Marketplace/get-ReferenciasPorColeccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cap : value.toString()}),
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    console.log("Tipos de archivo recibidos:", data);

    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter(item => item?.f120_referencia)
        .map(item => ({ label: item.f120_referencia, value: item.f120_referencia}));
    } else {
      console.error("Formato incorrecto o vacío:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener tipos de archivo:", error);
    return [];
  }
};

const handleMarketRef = async (value) => {
  console.log(value)
  setSelectedMarketRef(value)
  setMarketCol(await fetchColores(value));
};
const fetchColores = async (value) => {
  try {
    const response = await fetch(`${urlapi}/Marketplace/get-ColoresPorReferencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ref : value.toString()}),
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    console.log("Tipos de archivo recibidos:", data);

    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter(item => item?.F117_ID)
        .map(item => ({ label: item.F117_DESCRIPCION, value: item.F117_ID}));
    } else {
      console.error("Formato incorrecto o vacío:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener tipos de archivo:", error);
    return [];
  }
};

const traerTabla = async (event) => {
  if (event) event.preventDefault();
  console.log(selectedMarketplace, selectedTipoArchivo, selectedMarketCap, selectedMarketRef, selectedMarketCol);

  if (selectedMarketplace !== null && selectedMarketCap !== null && selectedMarketRef !== null && selectedMarketCol !== null) {
    try {
      Swal.fire({
            title: 'Cargando Datos',
            text: 'Por favor espera...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
      const response = await fetch(`${urlapi}/Marketplace/get-ReporteMarket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            selectedMarketplace,
            selectedMarketRef.toString(),
            selectedMarketCol.toString(),
            selectedTipoArchivo == null ? "" : selectedTipoArchivo
          ],
        }),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const result = await response.json();
      console.log("Datos recibidos:", result);

      // Verifica que la respuesta tenga datos y el orden de columnas
      if (result.data && result.data.length > 0 && result.column_order) {
        setTableData(result.data); // Guardar los datos en el estado
        setTableHeaders(result.column_order);  // Usar el orden del backend
        Swal.close();
      } else {
        console.warn("No se recibieron datos válidos.");
        setTableData([]);
        setTableHeaders([]);
        Swal.close();
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se encontraron datos con los filtros seleccionados.',
            });
    }
  } else {

     // Estados de paginación


// Calcular los datos paginados
const paginatedData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);


// Función para manejar el cambio de página y tamaño de página
const handlePageChange = (page, size) => {
  setCurrentPage(page);
  setPageSize(size);
};
    Swal.fire({
          icon: 'info',
          title: 'Sin Filtros',
          text: 'Debes seleccionar Marketplace, Coleccion, Referencia y Color.',
        });
  }
};

const generarExcel = (event) => {
  if (event) event.preventDefault();

  if (tableData.length === 0) {
    console.warn("No hay datos para exportar.");
    Swal.fire({
      icon: 'warning',
      title: 'No hay Datos',
      text: 'No hay datos encontrados para exportar.',
    });
    return;
  }

  // Crear una hoja de cálculo con los datos y respetar el orden de las columnas
  const ws = XLSX.utils.json_to_sheet(tableData, { header: tableHeaders });

  // Crear un libro de trabajo y añadir la hoja de datos
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reporte");

  // Generar el archivo Excel y descargarlo
  XLSX.writeFile(wb, "Reporte_Marketplace.xlsx");
  Swal.fire({
                title: 'Correcto',
                text: 'Reporte Generado Exitosamente.',
                icon: "success",
                confirmButtonText: 'OK'
              });
};


 
// Calcular los datos paginados
const paginatedData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
 
 
// Función para manejar el cambio de página y tamaño de página
const handlePageChange = (page, size) => {
  setCurrentPage(page);
  setPageSize(size);
};

return (
  <section>
    <div className="ticket-table">
      <h2>
        <a href="/RaggedDigital/Home" className="left" title="volver">
          <i className="bi bi-arrow-left-circle"></i>
        </a>
        {'  '} Reportes Marketplace
      </h2>
      <h3>
        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
          <i className="bi bi-filter"></i>
        </a>
        {'  '} Filtrar por:
      </h3>
      <form>
        <div className="container">
          <div className="row-3">
            <Select
              style={{ width: 270 }}
              opc="0"
              placeholder="Marketplace"
              options={marketplaces}
              onChange={setSelectedMarketplace}
              value={selectedMarketplace}
            />
            <Select
              style={{ width: 270 }}
              placeholder="Tipo de archivo"
              options={tiposArchivo}
              onChange={setSelectedTipoArchivo}
              value={selectedTipoArchivo}
              disabled={selectedMarketplace !== "Falabella"} 
            />
            <Select
              style={{ width: 270 }}
              opc="66"
              placeholder="Colección"
              options={marketCap}
              onChange={handleMarketCap}
              value={selectedMarketCap}
              mode="multiple"
            />
          </div>

              <div className="row-3">
                <Select
                  opc="66"
                  style={{ width: 270 }}
                  placeholder="Referencia"
                  options={marketRef}
                  onChange={handleMarketRef}
                  value={selectedMarketRef}
                  disabled={marketRef.length < 1}
                  mode = "multiple"
                />

              <div className="row-3">
                <Select
                  style={{ width: 270 }}
                  placeholder="Color"
                  options={marketCol}
                  onChange={setSelectedMarketCol}
                  value={selectedMarketCol}
                  disabled={marketCol.length < 1}
                  mode = "multiple"
                />
              </div>
              
              <div className="col-12 col-md-5">
                <BotonBuscar onClick={traerTabla} />
                
              </div>
                <BotonDescargar onClick={generarExcel} />
            </div>
          </div>
        </form>
        {/* Aquí puedes agregar el código para renderizar los datos de la tabla */}
      </div>
      <table className="table table-striped table-hover">
  <thead>
    <tr>
      {tableHeaders.length > 0 ? (
        tableHeaders.map((header, index) => <th key={index}>{header}</th>)
      ) : (
        <th colSpan="9">
          <TbHandClick style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Seleccione las diferentes opciones para mostrar datos.
        </th>
      )}
    </tr>
  </thead>
  <tbody>
    {tableData.length > 0 ? (
      tableData.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {tableHeaders.map((header, colIndex) => (
            <td key={colIndex}>{row[header]}</td>
          ))}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="9">No hay datos disponibles.</td>
      </tr>
    )}
  </tbody>
</table>

    {/* Paginación debajo de la tabla */}
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={tableData.length}
      onChange={handlePageChange}
      showSizeChanger
      showQuickJumper
      pageSizeOptions={['5','10', '20', '50']}
    />;
  </section>
);

};

export default Marketplace;
