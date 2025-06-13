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
        const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
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
    // Nueva validación - permite buscar solo por fechas, solo por NITs o por ambos
    if (!selectedClientes.length && !seleccionarFechaRef.current?.hasDates()) {
      Swal.fire('Advertencia', 'Debe seleccionar al menos un NIT o un rango de fechas', 'warning');
      return;
    }

    Swal.fire({
      title: 'Consultando Recibos de Caja...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });

    // Formateo seguro de datos
    const formatDate = (date) => {
      if (!date) return null;
      return new Date(date).toISOString().split('T')[0];
    };

    const fechas = seleccionarFechaRef.current?.getDates();

    // Datos a enviar - NITs será null si no hay selección
    const requestData = {
      nits: selectedClientes.length > 0 ? selectedClientes : null, // Cambio clave aquí
      fecha_inicio: formatDate(fechas?.startDate),
      fecha_fin: formatDate(fechas?.endDate)
    };

    console.log('Datos enviados al backend:', requestData);

    const response = await axios.post(`${urlapi}/get-cruce-documentos`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error en la respuesta del servidor');
    }

    // Procesamiento de datos (mantén el existente)
    const processedData = response.data.data.map((item, idx) => {
      if (!Array.isArray(item) || item.length < 13) {
        console.error('Estructura de datos incorrecta:', item);
        return {
          id: idx + 1,
          error: 'Estructura de datos incorrecta'
        };
      }

      return {
        id: idx + 1,
        fecha_recibo: item[0] || '--',
        nit: item[1] || '--',
        razonSocial: item[2] || '--',
        reciboDeCaja: item[3] || '--',
        auxiliar: item[4] || '--',
        descripcionAuxiliar: item[5] || '--',
        debito: item[6] ? new Intl.NumberFormat('es-CO', { 
          style: 'currency', 
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(item[6]) : '$0',
        credito: item[7] ? new Intl.NumberFormat('es-CO', { 
          style: 'currency', 
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(item[7]) : '$0',
        dctoCruce: item[8] || '--',
        fechaRecaudo: item[9] || '--',
        fechaVencimiento: item[10] || '--',
        usuarioAprobacion: item[11] || '--',
        origen: item[12] || '--',
        rawDebito: item[6] || 0,
        rawCredito: item[7] || 0
      };
    });

    setData(processedData);
    
    if (processedData.length === 0) {
      Swal.fire('Información', 'No se encontraron recibos con los filtros aplicados', 'info');
    } else {
      Swal.close();
    }
  } catch (error) {
    console.error('Error completo:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
    Swal.fire({
      title: 'Error',
      text: error.response?.data?.message || error.message || 'Error al consultar recibos',
      icon: 'error'
    });
  }
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
                    <td>{item.razonSocial}</td>
                    <td>{item.reciboDeCaja}</td>
                    <td>{item.auxiliar}</td>
                    <td>{item.descripcionAuxiliar}</td>
                    <td>{item.debito}</td>
                    <td>{item.credito}</td>
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