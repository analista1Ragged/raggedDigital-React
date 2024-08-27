import React, { useState, useEffect,useMemo, useCallback, useRef } from 'react';
import './InvenariosDisponibles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import MultiSelector2 from '../../components/MultiSelector/MultiSelector2.jsx';
import { urlapi } from '../../App.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import FilterRowInventarios from '../../components/FilterRow/FilterRowInventarios.jsx';
import CampoTextoReferencia from '../../components/CampoTexto/CampoTextoReferencia.jsx';


const transformData = (list, handleIconClick) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }
  

  return list.map((item, index) => ({
    item: index + 1,
    documento: item[0] || 'N/A',
    nombre: item[1] || 'N/A',
    fecha: item[4] || 'N/A',
    nroFactura: item[2] || 'N/A',
    valorFactura: item[3] || 'N/A',
    fechaVenc: item[4] || 'N/A', 
    diasCart: item[5] || 'N/A', 
    valorAbono: item[6] || 'N/A', 

  }));
};


const InventariosDisponibles = () => {
  const [data, setData] = useState([]);
  const [excel,setExcel] = useState([]);
  const [filtersInventarios, setFiltersInventarios] = useState({
  Coleccion: '',
  Referencia:'',
  Categoría:'',
  Codigo_Color: '',
  Nombre_Color: '',
  Talla: '',
  Codigo_Barras: '',
  Cantidad_Disponible: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total,setTotal] = useState([]);
  const [valorCampo, setValorCampo] = useState('');
  const [listaColeccion, setListaColeccion] = useState([]);
  const [listaColor, setListaColor] = useState([]);
  const [listaLinea, setListaLinea] = useState([]);
  const [selectedColecciones, setSelectedColecciones] = useState([]);
  const [selectedColores, setSelectedColores] = useState([]);
  const [selectedLineas, setSelectedLineas] = useState([]);
  
  const manejarActualizacionValor = (nuevoValor) => {
    setValorCampo(nuevoValor);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      Swal.fire({
        title: 'Cargando formulario...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const response = await fetch(urlapi+'/get-InventarioFiltros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });
      const listas = await response.json();
      console.log(listas)
      
      const coleccion = [];
      const color = [];
      const linea = [];

      listas.forEach(item => {
        const [tipo, valor] = item;
        if (tipo === "Coleccion") {
          coleccion.push(valor);
        } else if (tipo === "Color") {
          color.push(valor);
        } else if (tipo === "Linea") {
          linea.push(valor);
        }
      });

      // Actualizar los estados
      console.log(coleccion,color,linea)
      setListaColeccion(coleccion);
      setListaColor(color);
      setListaLinea(linea);
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
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [currentPage, pageSize, data]);
  
;

  const handleChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleFacturasChange = (selected) => {
    console.log('Facturas seleccionadas:', selected);
    //setSelectedFacturas(selected);
  };


  const handleConsulta = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log(valorCampo)
    try {
      Swal.fire({
        title: 'Consultando Facturas...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const response = await axios.get(urlapi+'/get-InventarioDisp', {
        
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
        const transformedData = transformData(dataWithoutLastLine);
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
  Coleccion: '',
  Referencia:'',
  Categoría:'',
  Codigo_Color: '',
  Nombre_Color: '',
  Talla: '',
  Codigo_Barras: '',
  Cantidad_Disponible: '',
}), []);


  const formRef = useRef();

  // Función para limpiar los campos del MultiSelector
  const clearSelector = () => {

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
      <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
        <i className="bi bi-arrow-left-circle"></i>
      </a>
      {'  '} Inventarios Disponibles RagStyle
    </h2>
    <h3>
      <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
        <i className="bi bi-filter"></i>
      </a>
      {'  '} Filtrar por: 
    </h3>
    <form onSubmit={handleConsulta}>
      <div className="container">
        <div className="multi-selector">
        <div className="row">
              <MultiSelector2 
                options={listaColeccion}
                opc='0'
                placeholder="Filtrar por Colección:"
                onSelectChange={setSelectedColecciones} 
                value={selectedColecciones}
              />
              <MultiSelector2
                options={listaColor}
                opc='0'
                placeholder="Filtrar por Linea:"
                onSelectChange={setSelectedLineas} 
                value={selectedLineas}
              />
              <MultiSelector2 
                options={listaLinea}
                opc='0'
                placeholder="Filtrar por Color:"
                onSelectChange={setSelectedColores} 
                value={selectedColores}
              />
          </div>
        </div>
          <div className="container">
            <div className="row">
              <CampoTextoReferencia
                placeholder="Buscar por: Ref1 , Ref2, Ref3"
              />  
            </div>
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

    {/* Contenedor con scroll horizontal */}
    <div className="tabla-container">
      <div className="tabla-scroll">
        <table className="table table-striped table-hover ticket-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Colección</th>
              <th scope="col">Referencia</th>
              <th scope="col">Linea</th>
              <th scope="col">Color</th>
              <th scope="col">Talla</th>
              <th scope="col">Cod Barras</th>
              <th scope="col">Cant Disponible</th>
            </tr>
            <FilterRowInventarios filtersInventarios={filtersInventarios} handleFilter={handleFilter} />
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.documento}</td>
                <td>{item.nombre}</td>
                <td>{item.nroFactura}</td>
                <td>{item.valorFactura}</td>
                <td>{item.fechaVenc}</td>
                <td>{item.diasCart}</td>
                <td>{item.valorAbono}</td>
              </tr>
            ))}
          </tbody>
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
  </div>
</section>

  );
};

export default InventariosDisponibles;