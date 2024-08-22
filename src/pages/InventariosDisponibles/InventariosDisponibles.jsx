import React, { useState, useEffect,useMemo, useCallback, useRef } from 'react';
import './InvenariosDisponibles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu2Botones from '../../components/Menu3Botones/Menu2Botones.jsx';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import MultiSelector from '../../components/MultiSelector/MultiSelector.jsx';
import { urlapi } from '../../App.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import FilterRowInventarios from '../../components/FilterRow/FilterRowInventarios.jsx';


const transformData = (list, handleIconClick) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }
  

  return list.map((item, index) => ({
    item: index + 1,
    Marca: item[0] || 'N/A',
    Coleccion: item[1] || 'N/A',
    Referencia: item[2] || 'N/A',
    Codigo_Color: item[4] || 'N/A',
    Nombre_Color: item[5] || 'N/A',
    Talla: item[3] || 'N/A', 
    Descripcion: item[7] || 'N/A', 
    Codigo_Barras: item[6] || 'N/A', 
    Cantidad_Existencia: item[8] || 'N/A', 
    Cantidad_Disponible: item[9] || 'N/A', 
    Cantidad_Comprometida: item[10] || 'N/A'
  }));
};


const InventariosDisponibles = () => {
  const [data, setData] = useState([]);
  const [excel,setExcel] = useState([]);
  const [filtersInventarios, setFiltersInventarios] = useState({
  Marca: '',
  Coleccion: '',
  Referencia:'',
  Codigo_Color: '',
  Nombre_Color: '',
  Talla: '',
  Descripcion: '',
  Codigo_Barras: '',
  Cantidad_Existencia: '',
  Cantidad_Disponible: '',
  Cantidad_Comprometida: ''
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
    setFiltersInventarios({
      ...filtersInventarios,
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
    const filtroDocumento = String(filtersInventarios.documento || ''); // Convertir a cadena
    // Filtrar usando toLowerCase() y includes()
    return item.Marca.toLowerCase().includes(filtersInventarios.Marca.toLowerCase()) &&
    item.Coleccion.toLowerCase().includes(filtersInventarios.Coleccion.toLowerCase()) &&
    item.Referencia.toLowerCase().includes(filtersInventarios.Referencia.toLowerCase()) &&
    item.Codigo_Color.toLowerCase().includes(filtersInventarios.Codigo_Color.toLowerCase()) &&
    item.Nombre_Color.toLowerCase().includes(filtersInventarios.Nombre_Color.toLowerCase()) &&
    item.Talla.toLowerCase().includes(filtersInventarios.Talla.toLowerCase()) &&
    item.Descripcion.toLowerCase().includes(filtersInventarios.Descripcion.toLowerCase()) &&
    item.Codigo_Barras.toLowerCase().includes(filtersInventarios.Codigo_Barras.toLowerCase()) &&
    item.Cantidad_Existencia.toLowerCase().includes(filtersInventarios.Cantidad_Existencia.toLowerCase()) &&
    item.Cantidad_Disponible.toLowerCase().includes(filtersInventarios.Cantidad_Disponible.toLowerCase()) &&
    item.Cantidad_Comprometida.toLowerCase().includes(filtersInventarios.Cantidad_Comprometida.toLowerCase()) 
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
  Marca: '',
  Coleccion: '',
  Referencia:'',
  Codigo_Color: '',
  Nombre_Color: '',
  Talla: '',
  Descripcion: '',
  Codigo_Barras: '',
  Cantidad_Existencia: '',
  Cantidad_Disponible: '',
  Cantidad_Comprometida: ''
}), []);


  const formRef = useRef();

  // Función para limpiar los campos del MultiSelector
  const clearSelector = () => {
    setSelectedClientes([]);
    setSelectedNombres([]); // Establece el estado en un array vacío para limpiar las selecciones setSelectorValue
    setSelectedFacturas([]);
    

  };
  
  // Función para limpiar los campos de fecha
  const handleClearDates = () => {
    formRef.current.setFieldsValue({
      date1: undefined,
      date2: undefined,
    });
  };

    // Manejador que combina ambas funciones
    const handleButtonClick = () => {
      clearSelector(); // Ejecuta la acción existente
      handleClearDates(); // Limpia las fechas
    };

  return (
    <section>
      <div className="ticket-table">
        <h2>
          <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos"><i className="bi bi-arrow-left-circle"></i></a>
          {'  '}
          Inventarios Disponibles RagStyle
        </h2>
        <p>
        <h3>
        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos"><i className="bi bi-filter"></i></a>
          {'  '}
          Filtrar por: 
          </h3>
        </p>
        <form onSubmit={handleConsulta}>
        <div className = "container">
          <div className="row">
            <MultiSelector 
              options={listaClientes}
              opc='0'
              placeholder="Filtrar por Nit:"
              onSelectChange={setSelectedClientes} 
              value={selectedClientes} //este es el campo que trae el valor
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
          <div className = "container">
          <div className="inline-components2">
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
        </form>
        <div className="tabla-container">
        <Menu2Botones marca={excel} />
          <table className="table table-striped table-hover ticket-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NombreMarca</th>
                <th scope="col">Colección</th>
                <th scope="col">Referencia</th>
                <th scope="col">CodigoColor</th>
                <th scope="col">NombreColor</th>
                <th scope="col">Talla</th>
                <th scope="col">Descripción</th>
                <th scope="col">CodigoBarras</th>
                <th scope="col">Cantidad Existencias</th>
                <th scope="col">Cantidad Disponible</th>
                <th scope="col">Cantidad Comprometida</th>
              </tr>
              <FilterRowInventarios filtersInventarios={filtersInventarios} handleFilter={handleFilter} />
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
      </div>
    </section>
  );
};

export default InventariosDisponibles;