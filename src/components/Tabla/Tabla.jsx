import React, { useState, useEffect } from 'react';
import "./Tabla.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu2Botones from '../Menu3Botones/Menu2Botones.jsx';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import CampoTexto from '../CampoTexto';
import BuscarButton from '../BotonBuscar/BotonBuscar';
import BuscarLimpiar from '../BotonLimpiar/BotonLimpiar.jsx';
import SeleccionarFecha from '../SeleccionarFecha/SeleccionarFecha';
import ModalCartera from "../ModalMenu/ModalMenu";
import MultiSelector from '../MultiSelector/MultiSelector.jsx';
import { urlapi } from '../../App';
import Swal from 'sweetalert2';
import axios from 'axios';

// Componente EstadoFactura
const EstadoFactura = ({ estado }) => {
  return (
    <Tag color={estado === 1 ? "#FF5050" : "#87d068"}>
      {estado === 1 ? "Vencido" : "Sin Vencer"}
    </Tag>
  );
};

const transformData = (list, handleIconClick) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }

  return list.map((item, index) => ({
    item: index + 1,
    cedula: item[0] || 'N/A',
    nombre: item[1] || 'N/A',
    fecha: item[2] || 'N/A',
    nroFactura: item[4] || 'N/A',
    valorFactura: item[5] || 'N/A',
    fechaVenc: item[3] || 'N/A', 
    diasCartera: item[7] || 'N/A', 
    valorAbono: item[6] || 'N/A', 
    saldoFactura: item[8] || 'N/A', 
    estado: item[9] || 'N/A',
    ver_detalle_NC: (
      <button onClick={() => handleIconClick(index,item[4])} className="icon-button">
        <i className="bi bi-eye"></i>
      </button>
    )
  }));
};

const Tabla = () => {
  const [data, setData] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [filtersCartera, setFiltersCartera] = useState({
    cedula: '',
    nombre: '',
    fecha: '',
    nroFactura: '',
    valorFactura: '',
    fechaVenc: '',
    diasCartera: '',
    valorAbono: '',
    estado: '',
    nroNotaCredito: '',
    valorNotaCredito: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [listaClientes, setListaClientes] = useState([]);
  const [listaFacturas, setListaFacturas] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [selectedNombres, setSelectedNombres] = useState([]);
  const [selectedFacturas, setSelectedFacturas] = useState([]);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [modalData, setModalData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const correo = sessionStorage.getItem('log');
      const response = await fetch(urlapi+'/get-clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: correo })
      });
      const listas = await response.json();
      setListaClientes(listas[0]);
      setListaFacturas(listas[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersCartera({
      ...filtersCartera,
      [name]: value
    });
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // Solo los elementos correspondientes a la página actual

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleIconClick = async (index, data) => {
    const nroFactura = data;
    console.log('Detalles de la fila:', data);

    try {
      Swal.fire({
        title: `Consultando Abonos de \n${nroFactura}`,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const response = await axios.post(`${urlapi}/get-facturas-detalle`, {
        nroFactura: nroFactura
      });

      const facturaDetalles = response.data;
      console.log(facturaDetalles)
      setModalData(facturaDetalles); // Guardar los datos en el estado
      Swal.close();
      setModal1Visible(true); // Mostrar el modal
    } catch (error) {
      console.error('Error fetching factura details:', error);
      Swal.fire('Error', 'Hubo un problema al consultar los detalles de la factura.', 'error');
    }
  };

  const handleClientesChange = (selected) => {
    console.log('Clientes seleccionados:', selected);
    setSelectedClientes(selected);
  };

  const handleNombresChange = (selected) => {
    console.log('Nombres seleccionadas:', selected);
    setSelectedNombres(selected);
  };
  
  const handleFacturasChange = (selected) => {
    console.log('Facturas seleccionadas:', selected);
    setSelectedFacturas(selected);
  };

  const handleDate1Change = (newDate) => {
    console.log('Fecha Inicial seleccionada:', newDate);
    setDate1(newDate);
  };
  
  const handleDate2Change = (newDate) => {
    console.log('Fecha Final seleccionada:', newDate);
    setDate2(newDate);
  };

  const handleConsulta = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      Swal.fire({
        title: 'Consultando Facturas...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const correo = sessionStorage.getItem('log')
      const response = await axios.post(urlapi+'/get-facturas', {
        correo: correo,
        nit: selectedClientes,
        nombre:selectedNombres,
        factura:selectedFacturas,
        date1: date1, 
        date2: date2
      });
      console.log('Respuesta de la API:', response.data);
      if(response.data.length > 0){
        setData(transformData(response.data, handleIconClick));
        Swal.close();
      } else {
        Swal.close();
        Swal.fire('Ups!', 'No se encontraron facturas asociadas a los filtros.', 'info');
      }
    } catch (error) {
      Swal.close();
      console.error('Error durante la consulta:', error);
      Swal.fire('Error', 'Hubo un problema al consultar las facturas.', 'error');
    }
  };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Consulta Cartera RagStyle
        </h2>
        <p>
        <h3>
        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos"><i className="bi bi-filter"></i></a>
          {'  '}
          Filtrar por: 
          </h3>
        </p>
        <form onSubmit={handleConsulta}>
          <div className="inline-components">
            <MultiSelector 
              options={listaClientes}
              opc='0'
              placeholder="Filtrar por Nit:"
              onSelectChange={handleClientesChange} 
            />
            <MultiSelector
              options={listaClientes}
              opc='1'
              placeholder="Filtrar por Nombre/Razon S."
              onSelectChange={handleNombresChange} 
            />
            <MultiSelector 
              options={listaFacturas}
              opc='0'
              placeholder="Filtrar por Numero Factura"
              onSelectChange={handleFacturasChange} 
            />
          </div>
          <div className="inline-components2">
            <SeleccionarFecha 
              onDate1Change={handleDate1Change}
              onDate2Change={handleDate2Change}
              className="component-item" 
            />
            <BuscarButton 
              onClick={handleConsulta}
              className="component-item" 
            />
            <BuscarLimpiar 
              onClick={handleConsulta}
              className="component-item" 
            />
          </div>
        </form>
        <div className="tabla-container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nit</th>
                <th scope="col">Nombre Cliente</th>
                <th scope="col">Fecha</th>
                <th scope="col">Numero Factura</th>
                <th scope="col">Valor Factura</th>
                <th scope="col">Fecha Vencimiento</th>
                <th scope="col">Dias Cartera</th>
                <th scope="col">Valor Abono</th>
                <th scope="col">Saldo Factura</th>
                <th scope="col">Estado</th>
                <th scope="col">Ver Detalle NC</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.cedula}</td>
                  <td>{item.nombre}</td>
                  <td>{item.fecha}</td>
                  <td>{item.nroFactura}</td>
                  <td>{item.valorFactura}</td>
                  <td>{item.fechaVenc}</td>
                  <td>{item.diasCartera}</td>
                  <td>{item.valorAbono}</td>
                  <td>{item.saldoFactura}</td>
                  <td><EstadoFactura estado={item.estado} /></td> {/* Aquí se muestra el estado de la factura */}
                  <td>{item.ver_detalle_NC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={handleChangePage}
            showSizeChanger
            pageSizeOptions={['10', '20', '30']}
          />
        </div>
        <ModalCartera
          title="Detalle Factura"
          visible={modal1Visible}
          data={modalData} 
          onCancel={() => setModal1Visible(false)}
        />
      </div>
    </section>
  );
};

export default Tabla;
