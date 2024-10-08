import React, { useState, useEffect,useMemo, useCallback, useRef } from 'react';
import './InvenariosDisponibles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd'; // Importa Tag de Ant Design para el componente EstadoFactura
import 'antd/dist/reset.css'; // Importa los estilos CSS prediseñados de Ant Design
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import MultiSelector2 from '../../components/MultiSelector/MultiSelector2.jsx';
import { urlapi } from '../../App.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import FilterRowInventarios from '../../components/FilterRow/FilterRowInventarios.jsx';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import Menu2Botones from '../../components/Menu3Botones/Menu2Botones.jsx';

const transformData = (list, handleIconClick) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }
  

  return list.map((item, index) => ({
    item: index + 1,
    coleccion: item[0] || 'N/A',
    referencia: item[1] || 'N/A',
    linea: item[2] || 'N/A',
    descripcion: item[3] || 'N/A',
    color: item[4] || 'N/A',
    talla: item[5] || 'N/A',
    cantDisponible: item[6] || 'N/A', 
    
  }));
};

const EstadoFactura = ({ quantity }) => {
  let color, text;

  if (quantity <= 20) {
    color = '#FF5050'; // Rojo
    text = `${quantity}`;
  } else if (quantity > 20 && quantity <= 30) {
    color = '#FFA500'; // Naranja
    text = `${quantity}`;
  } else {
    color = '#87d068'; // Verde
    text = `${quantity}`;
  }

  return (
    <Tag color={color}>
      {text}
    </Tag>
  );
};



const InventariosDisponibles = () => {
  const [data, setData] = useState([]);
  const [excel,setExcel] = useState([]);
  const [filtersInventario, setFiltersInventarios] = useState({
    coleccion: '',
    referencia: '',
    linea: '',
    descripcion: '',
    color: '',
    talla: '',
    cantDisponible: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [valorCampo, setValorCampo] = useState('');
  const [listaColeccion, setListaColeccion] = useState([]);
  const [listaColor, setListaColor] = useState([]);
  const [listaLinea, setListaLinea] = useState([]);
  const [selectedColecciones, setSelectedColecciones] = useState([]);
  const [selectedColores, setSelectedColores] = useState([]);
  const [selectedLineas, setSelectedLineas] = useState([]);
  const [showMyMenu, setShowMyMenu] = useState(true); // Estado para controlar la visibilidad de MyMenu


  
  /*const manejarActualizacionValor = (nuevoValor) => {
    setValorCampo(nuevoValor);
  };*/
  
  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      Swal.fire({
        title: 'Cargando filtros inventario...',
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
      setShowMyMenu(false); // Ocultar MyMenu cuando se terminen de cargar los filtros
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.close();
    }
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersInventarios({
      ...filtersInventario,
      [name]: value
    });
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = useMemo(() => {
    // Calcular el índice de inicio y fin basado en la paginación
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
  
    // Filtrar los datos y luego aplicar paginación
    return data
    .filter((item) =>
      item.coleccion.toLowerCase().includes(filtersInventario.coleccion.toLowerCase()) &&
      item.referencia.toLowerCase().includes(filtersInventario.referencia.toLowerCase()) &&
      item.linea.toLowerCase().includes(filtersInventario.linea.toLowerCase()) &&
      item.descripcion.toLowerCase().includes(filtersInventario.descripcion.toLowerCase()) &&
      item.color.toLowerCase().includes(filtersInventario.color.toLowerCase()) &&
      item.talla.toLowerCase().includes(filtersInventario.talla.toLowerCase()) &&
      item.cantDisponible.toString().includes(filtersInventario.cantDisponible)
    )
    .slice(start, end);
}, [currentPage, pageSize, data, filtersInventario]);
  


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
    console.log(valorCampo,typeof(valorCampo))
    try {
      Swal.fire({
        title: 'Consultando Inventario...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const response = await axios.post(urlapi+'/get-InventarioDisp', {
        ref:valorCampo,
        coleccion:selectedColecciones,
        color:selectedColores,
        linea:selectedLineas
      });

      console.log('Respuesta de la API:', response.data);
      if(response.data.length > 0){
        const transformedData = transformData(response.data);
        setData(transformedData);
        setExcel(transformedData);
        
        Swal.close();
      } else {
        Swal.close();
        Swal.fire('Ups!', 'No se encontraron existencias asociadas a los filtros.', 'info');
      }
    } catch (error) {
      Swal.close();
      console.error('Error durante la consulta:', error);
      Swal.fire('Error', 'Hubo un problema al consultar el Inventario.', 'error');
    }
};



const initialFiltersCartera = useMemo(() => ({
  coleccion: '',
  referencia:'',
  linea:'',
  descripcion: '',
  color: '',
  talla: '',
  cantDisponible: '',
}), []);


  const formRef = useRef();

  // Función para limpiar los campos del MultiSelector
  const clearSelector = () => {
    setSelectedColecciones([]);
    setSelectedLineas([]);
    setSelectedColores([]);
    setFiltersInventarios({
      coleccion: '',
      referencia: '',
      linea: '',
      descripcion: '',
      color: '',
      talla: '',
      cantDisponible: ''
    });
    setValorCampo(''); // Limpia también el campo de texto
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

    const calculateColor = (quantity) => {
      // implementación de la función
    };
    
    const InventariosDisponibles = () => {
      // implementación del componente
      return (
        <div>
          <Tag color={calculateColor(15)}>Vencido</Tag>
          <Tag color={calculateColor(25)}>Por Vencer</Tag>
          <Tag color={calculateColor(35)}>Sin Vencer</Tag>
        </div>
      );
    };
    const manejarActualizacionValor = (e) => {
      setValorCampo(e.target.value); // Actualiza el valor del campo de texto
    };

  return (
    <section>
  <div className="ticket-table">
    <h2>
      <a href="/RaggedDigital/Home" className="left" title="volver">
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
        <div className="row-3">
              {/*<MultiSelector2 
                options={listaColeccion}
                opc='0'
                placeholder="Filtrar por Colección:"
                onSelectChange={setSelectedColecciones} 
                value={selectedColecciones}
              />*/}
              <MultiSelector2
                options={listaColor}
                opc='0'
                placeholder="Filtrar por Color:"
                onSelectChange={setSelectedLineas} 
                value={selectedLineas}
              />
              <MultiSelector2 
                options={listaLinea}
                opc='0'
                placeholder="Filtrar por Linea:"
                onSelectChange={setSelectedColores} 
                value={selectedColores}
              />
          </div>
        </div>
        </div>
          <div className="container">
            <div className="multi-selector">
              <div className="row">
                <div className='col'>
                    <div className="inline-components2">

                            <CampoTexto
                              placeholder="Ingrese ref: PF32111310,PF31310669..."
                              value={valorCampo} // Vinculado al estado
                              onChange={manejarActualizacionValor}
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
          </div>
         
    </form>

    {showMyMenu && <Menu2Botones archivo="inventario.xlsx" />}
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
              <th scope="col">Descripción</th>
              <th scope="col">Color</th>
              <th scope="col">Talla</th>
              <th scope="col">Cant Disponible</th>
            </tr>
            <FilterRowInventarios filtersInventario={filtersInventario} handleFilter={handleFilter} handleButtonClick={handleButtonClick}/>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.coleccion}</td>
                <td>{item.referencia}</td>
                <td>{item.linea}</td>
                <td>{item.descripcion}</td>
                <td>{item.color}</td>
                <td>{item.talla}</td>
                <td> <EstadoFactura quantity={item.cantDisponible} />
                </td>               
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