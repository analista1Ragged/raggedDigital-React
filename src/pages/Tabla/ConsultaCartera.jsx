import React, { useState, useEffect,useMemo, useCallback, useRef } from 'react';
import "./ConsultaCartera.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu2Botones from '../../components/Menu3Botones/Menu2Botones.jsx';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
//import CampoTexto from '../CampoTexto';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import ModalCartera from '../../components/ModalMenu/ModalMenu.jsx';
import MultiSelector from '../../components/MultiSelector/MultiSelector.jsx';
import { urlapi } from '../../App.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import FilterRowCartera from '../../components/FilterRow/FilterRowCartera.jsx'

// Componente EstadoFactura
const EstadoFactura = ({ estado }) => {
  let color, text;

  if (estado === "Vencido") {
    color = "#FF5050"; // Rojo
    text = "Vencido";
  } else if (estado === "Por Vencer") {
    color = "#D4B106"; // Amarillo mostaza
    text = "Por Vencer";
  } else {
    color = "#87d068"; // Verde
    text = "Sin Vencer";
  }
  return (
    <Tag color={color}>
      {text}
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
    documento: item[0] || 'N/A',
    nombre: item[1] || 'N/A',
    fecha: item[2] || 'N/A',
    nroFactura: item[4] || 'N/A',
    valorFactura: item[5] || 'N/A',
    fechaVenc: item[3] || 'N/A', 
    diasCart: item[7] || 'N/A', 
    valorAbono: item[6] || 'N/A', 
    saldoFactura: item[8] || 'N/A', 
    estado: String(item[9]) || 'N/A',
    ver_detalle_NC: (
      <button onClick={() => handleIconClick(index,item[4])} className="icon-button">
        <i className="bi bi-eye" title='Ver Detalle'></i>
      </button>
    ),

    valor:item[10]|| 'N/A',
    abono:item[11]|| 'N/A',
    saldo:item[12]|| 'N/A',
    state:item[13]|| 'N/A'
  }));
};


const Tabla = () => {
  const [data, setData] = useState([]);
  const [excel,setExcel] = useState([]);
  const [filtersCartera, setFiltersCartera] = useState({
  documento: '',
  nombre: '',
  fecha: '',
  nroFactura:'',
  valorFactura: '',
  fechaVenc: '',
  diasCart: '',
  valorAbono: '',
  saldoFactura: '',
  estado: ''
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
  const [total,setTotal] = useState([]);
  
  
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

      setListaClientes(listas[0]);
      setListaFacturas(listas[1]);
      Swal.close();
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
  const currentItems = data
  
  .filter(item =>{
    // Convertir item.documento a cadena si no lo es
    const documento = String(item.documento || ''); // Convertir a cadena
    const filtroDocumento = String(filtersCartera.documento || ''); // Convertir a cadena
    // Filtrar usando toLowerCase() y includes()
    return documento.toLowerCase().includes(filtroDocumento.toLowerCase()) &&
    item.nombre.toLowerCase().includes(filtersCartera.nombre.toLowerCase()) &&
    item.fecha.toLowerCase().includes(filtersCartera.fecha.toLowerCase()) &&
    item.nroFactura.toLowerCase().includes(filtersCartera.nroFactura.toLowerCase()) &&
    item.valorFactura.toLowerCase().includes(filtersCartera.valorFactura.toLowerCase()) &&
    item.fechaVenc.toLowerCase().includes(filtersCartera.fechaVenc.toLowerCase()) &&
    item.diasCart.toLowerCase().includes(filtersCartera.diasCart.toLowerCase()) &&
    item.valorAbono.toLowerCase().includes(filtersCartera.valorAbono.toLowerCase()) &&
    item.saldoFactura.toLowerCase().includes(filtersCartera.saldoFactura.toLowerCase()) &&
    (typeof item.estado === 'string' ? item.estado.toLowerCase() : item.estado.toString()).includes(filtersCartera.estado.toLowerCase())
  })
  
  .slice(indexOfFirstItem, indexOfLastItem);

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
      const correo = sessionStorage.getItem('log');
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
        // Guardar la última línea en 'total'
        const lastLine = response.data[response.data.length - 1];
        setTotal([
          lastLine[5] || '0',  // valorFactura
          lastLine[6] || '0',  // valorAbono
          lastLine[8] || '0'   // saldoFactura
        ]);

        // Eliminar la última línea del array
        const dataWithoutLastLine = response.data.slice(0, -1);

        // Transformar y actualizar los datos
        const transformedData = transformData(dataWithoutLastLine, handleIconClick);
        setData(transformedData);
        setExcel(transformedData);
        
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

const initialFiltersCartera = useMemo(() => ({
  documento: '',
  nombre: '',
  fecha: '',
  nroFactura: '',
  valorFactura: '',
  fechaVenc: '',
  diasCart: '',
  valorAbono: '',
  saldoFactura: '',
  estado: ''
}), []);


  const formRef = useRef();

  // Función para limpiar los campos del MultiSelector
  const clearSelector = () => {
    setSelectedClientes([]);
    setSelectedNombres([]); // Establece el estado en un array vacío para limpiar las selecciones setSelectorValue
    setSelectedFacturas([]);
    setFiltersCartera({
      documento: '',
      nombre: '',
      fecha: '',
      nroFactura:'',
      valorFactura: '',
      fechaVenc: '',
      diasCart: '',
      valorAbono: '',
      saldoFactura: '',
      estado: ''
    });
    

  };
  
  // Función para limpiar los campos de fecha
  const handleClearDates = () => {
    setDate1(undefined);
    setDate2(undefined);
  };

    // Manejador que combina ambas funciones
    const handleButtonClick = () => {
      clearSelector(); // Ejecuta la acción existente
      handleClearDates(); // Limpia las fechas
      formRef.current.resetDateFields(); // Limpia los campos de fecha en SeleccionarFecha

    };
    

  return (
<section>
  <div className="ticket-table">
    <h2>
      <a href="/RaggedDigital/Home" className="left" title="volver">
        <i className="bi bi-arrow-left-circle"></i>
      </a>
      {'  '} Consulta Cartera RagStyle
    </h2>
    <h3>
      <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
        <i className="bi bi-filter"></i>
      </a>
      {'  '} Filtrar por: 
    </h3>
    <form onSubmit={handleConsulta}>
      <div className="container">
        <div className="row-3">
          <MultiSelector 
            options={listaClientes}
            opc='0'
            placeholder="Filtrar por Nit:"
            onSelectChange={setSelectedClientes} 
            value={selectedClientes}
          />
          <MultiSelector
            options={listaClientes}
            opc='1'
            placeholder="Filtrar por Nombre/Razon S."
            onSelectChange={setSelectedNombres} 
            value={selectedNombres}
          />
          <MultiSelector 
            options={listaFacturas}
            opc='0'
            placeholder="Filtrar por Numero Factura"
            onSelectChange={setSelectedFacturas} 
            value={selectedFacturas}
          />
        </div>
        <div className="container">
        <div className="row">
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
                onClick={handleButtonClick}
                className="component-item" 
              />
            </div>
          </div>  
        </div>
      </div>
    </form>
    <Menu2Botones marca={excel} archivo='cartera.xlsx'/>
    {/* Contenedor con scroll horizontal */}
    <div className="tabla-container">
      <div className="tabla-scroll">
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
            <FilterRowCartera filtersCartera={filtersCartera} handleFilter={handleFilter} handleButtonClick={handleButtonClick}/>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.documento}</td>
                <td>{item.nombre}</td>
                <td>{item.fecha}</td>
                <td>{item.nroFactura}</td>
                <td>{item.valorFactura}</td>
                <td>{item.fechaVenc}</td>
                <td>{item.diasCart}</td>
                <td>{item.valorAbono}</td>
                <td>{item.saldoFactura}</td>
                <td><EstadoFactura estado={item.estado} /></td>
                <td>{item.ver_detalle_NC}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan="5" className="total-label">Total:</td>
              <td className="total-value">{total[0]}</td>
              <td colSpan="2"></td>
              <td className="total-value">{total[1]}</td>
              <td className="total-value">{total[2]}</td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div className="paginacion">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handleChangePage}
        pageSizeOptions={['10', '20', '30','50','100']}
        showSizeChanger
        showQuickJumper
      />
    </div>
    
    <ModalCartera
      modal1Visible={modal1Visible}
      setModal1Visible={setModal1Visible}
      modalData={modalData}
    />
  </div>
</section>

  );
};

export default Tabla;
