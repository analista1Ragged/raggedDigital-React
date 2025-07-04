import React, { useState, useMemo, useRef, useEffect } from 'react';
import '../PedidosVtex/PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination } from 'antd';
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

// ✅ Función para exportar a Excel
const exportToExcel = (data, fileName = 'archivo_cruce_documentos.xlsx') => {
  if (!Array.isArray(data) || data.length === 0) {
    Swal.fire('Advertencia', 'No hay datos para exportar', 'warning');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(
    data.map(({ id, ...rest }) => rest) // Opcional: quita id si no lo quieres
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Recibos');

  XLSX.writeFile(workbook, fileName);
};

const RecibosDeCaja = () => {
  const [valorCampo, setValorCampo] = useState('');
  const [data, setData] = useState([]);
  const seleccionarFechaRef = useRef(null);
  const [listaClientes, setListaClientes] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      Swal.fire({
        title: 'Cargando nits, clientes y facturas...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
      });

      const correo = sessionStorage.getItem('log');
      const response = await fetch(urlapi + '/get-clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: correo }),
      });

      const listas = await response.json();
      setListaClientes(listas[0]);
      Swal.close();
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'No se pudieron cargar los datos de clientes', 'error');
    }
  };

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
    setData([]);
    setCurrentPage(1);
  };

  const filterData = (data, filters) => {
    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key] || '').toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const filteredData = useMemo(() => filterData(data, filtersRecibosCaja), [data, filtersRecibosCaja]);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleBuscarRecibos = async (event) => {
    event.preventDefault();
    try {
      if (!selectedClientes.length && !seleccionarFechaRef.current?.hasDates()) {
        Swal.fire('Advertencia', 'Seleccione NITs o fechas', 'warning');
        return;
      }

      const dates = seleccionarFechaRef.current?.getDates() || {};
      const requestData = {
        nits: selectedClientes,
        fecha_inicio: dates.date1 ? dates.date1.toISOString().split('T')[0] : null,
        fecha_fin: dates.date2 ? dates.date2.toISOString().split('T')[0] : null,
      };

      Swal.fire({
        title: 'Buscando recibos...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await axios.post(`${urlapi}/get-cruce-documentos`, requestData);

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Datos no válidos');
      }

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
      setCurrentPage(1);
      Swal.close();
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
      console.error('Detalles del error:', error.response?.data || error);
    }
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '$0';
    const numericValue = typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.-]/g, ''))
      : Number(value);
    let formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
    return formatted.replace(/\s/g, '').replace('.', ',');
  };

  return (
    <section className="pedidosvtex-section">
      <div className="pedidosvtex-ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="pedidosvtex-left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>{' '}
          Recibos de Caja
        </h2>

        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
          <i className="bi bi-filter"></i>
        </a>{' '}
        Filtrar por:

        <form>
          <div className="pedidosvtex-container">
            <div className="pedidosvtex-multi-selector">
              <MultiSelector
                options={listaClientes}
                opc="0"
                placeholder="Filtrar por Nit:"
                onSelectChange={setSelectedClientes}
                value={selectedClientes}
              />
              <div className="row">
                <div className="col">
                  <div className="separador">
                    <SeleccionarFecha className="component-item" ref={seleccionarFechaRef} />
                    <BuscarButton className="component-item" onClick={handleBuscarRecibos} />
                    <BuscarDescargar onClick={() => exportToExcel(filteredData)} />
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
                  handleFilter={(e) => {
                    setFiltersRecibosCaja({
                      ...filtersRecibosCaja,
                      [e.target.name]: e.target.value,
                    });
                    setCurrentPage(1);
                  }}
                />
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fecha_recibo}</td>
                    <td>{item.nit}</td>
                    <td className="align-left">{item.razonSocial}</td>
                    <td>{item.reciboDeCaja}</td>
                    <td>{item.auxiliar}</td>
                    <td className="align-left">{item.descripcionAuxiliar}</td>
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
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={handleChangePage}
            showSizeChanger
            pageSizeOptions={['10', '20', '50', '100']}
            showQuickJumper
            className="pagination"
          />
        </div>
      </div>
    </section>
  );
};

export default RecibosDeCaja;
