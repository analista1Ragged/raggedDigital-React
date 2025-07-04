import React, { useState, useMemo, useRef, useEffect } from 'react';
import '../PedidosVtex/PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Tag } from 'antd';
import 'antd/dist/reset.css';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import BuscarDescargar from '../../components/BotonDescargar/BotonDescargar.jsx';
import FilterRecibosDeCaja from '../../components/FilterRow/FilterRecibosCaja';
import MultiSelector from 'src/components/MultiSelector/MultiSelector';
import axios from 'axios';
import Swal from 'sweetalert2';
import { urlapi } from '../../App';
import * as XLSX from 'xlsx';

const RecibosDeCaja = () => {
  const [valorCampo, setValorCampo] = useState('');
  const [data, setData] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const seleccionarFechaRef = useRef(null);
  const [listaClientes, setListaClientes] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [listaFacturas, setListaFacturas] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
      fetchData();
    }, []);

  const fetchData = async () => {
  try {
    Swal.fire({
      title: 'Cargando nits, clientes y facturas...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const correo = sessionStorage.getItem('log');
    const response = await fetch(urlapi+'/get-clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario: correo })
    });

    const listas = await response.json();
    setListaClientes(listas[0]);   // NITs y razones sociales
    setListaFacturas(listas[1]);   // Facturas (si se usan más adelante)

    Swal.close();
  } catch (error) {
    console.error('Error fetching data:', error);
    Swal.fire('Error', 'No se pudieron cargar los datos de clientes', 'error');
  }
};


  const [filtersRecibosCaja, setFiltersRecibosCaja] = useState({
    fecha_recibo: '',
    nit: '',
    razonSocial: '',
    reciboDeCaja: '',
    auxiliar: '',
    descripcionAuxiliar: '',
    debito: '',
    credito: '',
    dctoCruce: '',
    fechaRecaudo: '',
    fechaVencimiento: '',
    usuarioAprobacion: '',
    origen: '',
  });

  const clearSelector = () => {
    setFiltersRecibosCaja({
      fecha_recibo: '',
      nit: '',
      razonSocial: '',
      reciboDeCaja: '',
      auxiliar: '',
      descripcionAuxiliar: '',
      debito: '',
      credito: '',
      dctoCruce: '',
      fechaRecaudo: '',
      fechaVencimiento: '',
      usuarioAprobacion: '',
      origen: '',
    });
    setValorCampo('');
    setSelectedOrders({});
    setData([]);
  };

  const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      // Manejo especial para campos numéricos
      if (key === 'debito' || key === 'credito') {
        const numericValue = parseFloat(value.replace(/[^0-9.,-]+/g, ""));
        const itemValue = key === 'debito' ? item.rawDebito : item.rawCredito;
        
        // Permitir búsqueda por rango (ej: ">100000")
        if (value.startsWith('>')) {
          return itemValue > numericValue;
        } else if (value.startsWith('<')) {
          return itemValue < numericValue;
        }
        return itemValue === numericValue;
      }

      // Búsqueda normal para otros campos
      return String(item[key] || '').toLowerCase().includes(value.toLowerCase());
    });
  });
};

  const filteredData = useMemo(() => filterData(data, filtersRecibosCaja), [data, filtersRecibosCaja]);

  const handleGenerate = () => {
    console.log("Generando reporte para:", selectedOrders);
    // Implementar lógica para generar reporte usando filteredData
    if (filteredData.length === 0) {
      Swal.fire('Advertencia', 'No hay datos para generar el reporte', 'warning');
      return;
    }
    // Lógica adicional para generar reporte...
  };

  const downloadExcelFile = () => {
    try {
      if (filteredData.length === 0) {
        Swal.fire('Advertencia', 'No hay datos para exportar', 'warning');
        return;
      }

      Swal.fire({
        title: 'Generando archivo Excel...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Preparar los datos
      const dataToExport = filteredData.map(item => {
        const newItem = {...item};
        delete newItem.id;
        return newItem;
      });

      // Crear libro de trabajo y hoja
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      
      // Agregar la hoja al libro
      XLSX.utils.book_append_sheet(wb, ws, "Recibos de Caja");
      
      // Generar el archivo y descargar
      XLSX.writeFile(wb, `Recibos_Caja_${new Date().toISOString().slice(0, 10)}.xlsx`);
      
      Swal.close();
    } catch (error) {
      console.error('Error al generar Excel:', error);
      Swal.fire('Error', 'No se pudo generar el archivo Excel', 'error');
    }
  };

  const handleBuscarRecibos = async (event) => {
  event.preventDefault();
  try {
    // Validación
    if (!selectedClientes.length && !seleccionarFechaRef.current?.hasDates()) {
      Swal.fire('Advertencia', 'Seleccione NITs o fechas', 'warning');
      return;
    }

    // Obtener fechas
    const dates = seleccionarFechaRef.current?.getDates() || {};
    console.log("Fechas crudas:", dates);

    const requestData = {
      nits: selectedClientes,
      fecha_inicio: dates.date1 ? dates.date1.toISOString().split('T')[0] : null,
      fecha_fin: dates.date2 ? dates.date2.toISOString().split('T')[0] : null
    };

    console.log("RequestData:", requestData);


    // Mostrar carga
    Swal.fire({
      title: 'Buscando recibos...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    // Llamada API
    const response = await axios.post(`${urlapi}/get-cruce-documentos`, requestData);

    // Procesar respuesta
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Datos no válidos');
    }

    // Transformar datos para la tabla
    const processedData = response.data.data.map((item, index) => ({
      id: index + 1,
      fecha_recibo: item.fecha_recibo || '--',
      nit: item.nit || '--',
      razonSocial: item.razonSocial || '--',
      reciboDeCaja: item.reciboDeCaja || '--',
      auxiliar: item.auxiliar || '--',
      descripcionAuxiliar: item.descripcionAuxiliar || '--',
      debito: formatCurrency(item.debito),
      credito: formatCurrency(item.credito),
      dctoCruce: item.dctoCruce || '--',
      fechaRecaudo: item.fechaRecaudo || '--',
      fechaVencimiento: item.fechaVencimiento || '--',
      usuarioAprobacion: item.usuarioAprobacion || '--',
      origen: item.origen || '--',
    }));

    setData(processedData);
    Swal.close();

  } catch (error) {
    Swal.fire('Error', error.message, 'error');
    console.error('Detalles del error:', error.response?.data || error);
  }
};

// Función para formatear valores monetarios
  const formatCurrency = (value) => {
  if (value === null || value === undefined) return '$0';
  
  // Si viene como string, convertir a número seguro
  const numericValue = typeof value === 'string'
    ? parseFloat(value.replace(/[^0-9.-]/g, ''))
    : Number(value);

  // Formatear usando es-CO y reemplazar el espacio y punto
  let formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue);

  // Elimina espacios después del signo de pesos y reemplaza punto por coma si existiera
  formatted = formatted.replace(/\s/g, '').replace('.', ',');

  return formatted;
};


  return (
    <section className="pedidosvtex-section">
      <div className="pedidosvtex-ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="pedidosvtex-left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '} Recibos de Caja
        </h2>

        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
          <i className="bi bi-filter"></i>
        </a>
        {'  '} Filtrar por:

        <form>
          <div className="pedidosvtex-container">
            <div className="pedidosvtex-multi-selector">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MultiSelector
                  options={listaClientes}
                  opc='0'
                  placeholder="Filtrar por Nit:"
                  onSelectChange={setSelectedClientes}
                  value={selectedClientes}
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="separador">
                    <SeleccionarFecha className="component-item" ref={seleccionarFechaRef} />
                    <BuscarButton className="component-item" onClick={handleBuscarRecibos} />
                    <BuscarDescargar onClick={clearSelector} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="pedidosvtex-tabla-container">
          <div className="pedidosvtex-tabla-scroll">
            <table className="table table-striped table-hover pedidosvtex-ticket-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha_Recibo</th>
                  <th>Nit</th>
                  <th>Razon_Social</th>
                  <th>Recibo_de_Caja</th>
                  <th>Auxiliar</th>
                  <th>Descripción_Auxiliar</th>
                  <th>DB</th>
                  <th>CR</th>
                  <th>Dcto_Cruce</th>
                  <th>Fecha_Recaudo</th>
                  <th>Fecha_Vencimiento</th>
                  <th>Usuario_Aprobación</th>
                  <th>Origen</th>
                </tr>
                <FilterRecibosDeCaja
                  filtersRecibosCaja={filtersRecibosCaja}
                  handleFilter={(e) => setFiltersRecibosCaja({
                    ...filtersRecibosCaja,
                    [e.target.name]: e.target.value
                  })}
                />
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fecha_recibo}</td>
                    <td>{item.nit}</td>
                    <td class="align-left">{item.razonSocial}</td>
                    <td>{item.reciboDeCaja}</td>
                    <td>{item.auxiliar}</td>
                    <td class="align-left">{item.descripcionAuxiliar}</td>
                    <td className="text-right">{item.debito}</td>
                    <td className="text-right">{item.credito}</td>
                    <td>{item.dctoCruce}</td>
                    <td>{item.fechaRecaudo}</td>
                    <td>{item.fechaVencimiento}</td>
                    <td>{item.usuarioAprobacion}</td>
                    <td>{item.origen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecibosDeCaja;