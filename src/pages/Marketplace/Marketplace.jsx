import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import MultiSelector from '../../components/MultiSelector/MultiSelector.jsx';
import BotonDescargar from 'src/components/BotonDescargar/BotonDescargar.jsx';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import { Select, Pagination } from 'antd'; // Importa el componente Select de Ant Design
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
      Swal.fire({
        title: 'Cargando opciones',
        //text: 'Por favor espera...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
        const response = await fetch(`${urlapi}/Marketplace/get-ConsultarMarketplace`);
 
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
 
        // Convertir la respuesta a JSON
        const r = await response.json();
        const data = r[0]
        Swal.close();
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
        Swal.close();
    }
};
 
 
// Cargar datos cuando el componente se monta
useEffect(() => {
  fetchMarketplaces();
  console.log(selectedMarketCap,typeof(selectedMarketCap));
}, []);
 
  // 🔹 Obtener tipos de archivo desde el backend
  const fetchTipoArchivo = async (value) => {
    try {
      const response = await fetch(`${urlapi}/Marketplace/get-ConsultarTipoArchivo`,{
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
          .filter(item => item?.ID)
          .map(item => ({ label: item.ARCHIVO, value: item.ID }));
      } else {
        console.error("Formato incorrecto o vacío:", data);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener tipos de archivo:", error);
      return [];
    }
  };
 
 
// Manejar selección del marketplace
  const handleMarketCap = async (value) => {
    Swal.fire({
      title: "Consultando referencias...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    console.log(value);

    let selectedValues = value;

    if (value.includes("selectAll")) {
      // Si selecciona "SELECCIONAR TODO", agregamos todas las opciones excepto "selectAll"
      selectedValues = marketCap.map((item) => item.value);
    }

    // Si se intentan eliminar todas las opciones desde "x" en +N más, limpiamos la selección
    if (value.length === 0) {
      selectedValues = [];
    }

    setSelectedMarketCap(selectedValues);

    if (selectedMarketplace === "Comercial.Sp_Consultar_Marketplace_Falabella") {
      console.log("Comercial.Sp_Consultar_Marketplace_Falabella");
      setTiposArchivo(await fetchTipoArchivo(selectedValues));
      setSelectedTipoArchivo("Tipo de archivo"); // Establece el valor por defecto
    } else {
      setMarketRef(await fetchReferencias(selectedValues));
      setSelectedTipoArchivo(null); // Desactiva el select
    }

    Swal.close();
  };



 
const fetchReferencias = async (value) => {
  try {
    const response = await fetch(`${urlapi}/Marketplace/get-ReferenciasPorColeccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cap: value.toString(),
        tipo: selectedTipoArchivo == null ? "" : selectedTipoArchivo
      }),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    console.log("Referencias recibidas:", data);

    if (Array.isArray(data) && data.length > 0) {
      let referencias = data
        .filter(item => item?.f120_referencia)
        .map(item => ({ label: item.f120_referencia, value: item.f120_referencia }));

      // Agregar la opción "SELECCIONAR TODO" al inicio
      return [{ label: "SELECCIONAR TODO", value: "selectAll" }, ...referencias];
    } else {
      console.error("Formato incorrecto o vacío:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener referencias:", error);
    return [];
  }
};

 
const handleMarketRef = async (value) => {
  Swal.fire({
    title: 'Consultando colores...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  let selectedValues = value.includes("selectAll")
    ? marketRef.map(item => item.value).filter(val => val !== "selectAll")
    : value;

  setSelectedMarketRef(selectedValues);

  const colores = await fetchColores(selectedValues);
  console.log('Colores:', colores); // Verifica si se están recibiendo los colores correctamente

  if (colores.length > 0) {
    setMarketCol([{ label: "SELECCIONAR TODO", value: "selectAll" }].concat(colores));
  } else {
    setMarketCol([]);
  }

  Swal.close();
};


 
const fetchColores = async (value) => {
  try {
    const response = await fetch(`${urlapi}/Marketplace/get-ColoresPorReferencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: value.toString() }),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    console.log("Colores recibidos:", data);

    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter(item => item?.F117_ID)
        .map(item => ({ label: item.F117_DESCRIPCION, value: item.F117_ID }));
    } else {
      console.error("Formato incorrecto o vacío:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener colores:", error);
    return [];
  }
};


const handleMarketCol = (value) => {
  console.log("Colores seleccionados:", value);

  let selectedValues = value.includes("selectAll")
    ? marketCol.map(item => item.value).filter(val => val !== "selectAll")
    : value;

  setSelectedMarketCol(selectedValues);
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
        Swal.fire({
          title: 'Reporte disponible',
          text: 'Se ha habilitado el boton para descargar reporte.',
          icon: "info",
          confirmButtonText: 'OK'
        });
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
    };
 
  } else {
    Swal.fire({
          icon: 'warning',
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
              placeholder="Marketplace"
              options={marketplaces}
              onChange={setSelectedMarketplace}
              value={selectedMarketplace}
            />
            <Select
              style={{ width: 270 }}
              placeholder="Colección"
              options={[
                { value: "selectAll", label: "SELECCIONAR TODO" },
                ...marketCap,
              ]}
              onChange={handleMarketCap}
              value={selectedMarketCap}
              mode="multiple"
              maxTagCount={1} // Muestra solo 2 etiquetas visibles
              maxTagPlaceholder={(omittedValues) => (
                <span onClick={() => setSelectedMarketCol([])} style={{ cursor: "pointer" }}>
                  +{omittedValues.length} más
                </span>
              )} // Al hacer clic en +N más, limpia la selección
              allowClear // Permite limpiar la selección con la "x"
              showArrow
            />


            <Select
              style={{ width: 270 }}
              placeholder="Tipo de archivo"
              options={tiposArchivo}
              onChange={setSelectedTipoArchivo}
              value={selectedTipoArchivo}
              disabled={selectedMarketplace !== "Comercial.Sp_Consultar_Marketplace_Falabella"}
            />
          </div>
          <div className="row-3">
          <h3></h3>
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
                mode="multiple"
                maxTagCount={1}
                maxTagPlaceholder={(omittedValues) => (
                  <span onClick={() => setSelectedMarketRef([])} style={{ cursor: "pointer" }}>
                    +{omittedValues.length} más
                  </span>
                )}
                allowClear
                showArrow
              />

 
              <div className="row-3">
              <Select
                style={{ width: 270 }}
                placeholder="Color"
                options={marketCol}
                onChange={handleMarketCol}
                value={selectedMarketCol}
                disabled={marketCol.length < 1}
                mode="multiple"
                maxTagCount={1} // Muestra solo 2 etiquetas visibles
                maxTagPlaceholder={(omittedValues) => (
                <span onClick={() => setSelectedMarketCol([])} style={{ cursor: "pointer" }}>
                  +{omittedValues.length} más
                </span>
              )} // Al hacer clic en +N más, limpia la selección
              allowClear // Permite limpiar la selección con la "x"
              />

              </div>
             
              <div className="col-12 col-md-5">
                <BotonBuscar onClick={traerTabla} />
               
              </div>
                <BotonDescargar
                  onClick={generarExcel}
                  disabled={tableData.length < 1}
                />
            </div>
          </div>
        </form>
        {/* Aquí puedes agregar el código para renderizar los datos de la tabla */}
      </div>
      {/* <table className="table table-striped table-hover">
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
 
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={tableData.length}
      onChange={handlePageChange}
      showSizeChanger
      showQuickJumper
      pageSizeOptions={['5','10', '20', '50']}
    />; */}
  </section>
);
 
};
 
export default Marketplace;