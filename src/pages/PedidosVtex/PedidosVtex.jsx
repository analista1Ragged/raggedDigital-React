import React, { useState, useEffect, useMemo, useRef } from 'react';
import './PedidosVtex.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Tag } from 'antd';
import 'antd/dist/reset.css';
import CampoTexto from '../../components/CampoTexto/CampoTextoReferencia.jsx';
import SeleccionarFecha from '../../components/SeleccionarFecha/SeleccionarFecha.jsx';
import BuscarButton from '../../components/BotonBuscar/BotonBuscar.jsx';
import Menu2BotonesG from '../../components/Menu3Botones/Menu2BotonesG.jsx';
import BuscarLimpiar from '../../components/BotonLimpiar/BotonLimpiar.jsx';
import FilterPedidosVtex from '../../components/FilterRow/FilterPedidosVtex.jsx';
import ListaOpcionesP from "../../components/ListaOpciones/ListaOpcionesP.jsx";
import * as XLSX from 'xlsx';
import { urlapi } from '../../App';
import axios from 'axios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';  // Importa Day.js

const EstadoFactura = ({ estadoVtex }) => {
  let color, text;

  switch (estadoVtex) {
//Siesa
    case "Sin Importar a Siesa":
      color = '#4f5d56';
      text = "Sin Importar";
      break;
    case "Comprometido":
      color = '#FFA500'; // Naranja
      text = estadoVtex;
      break;
    case "Elaboracion":
      color = '#BD8989'; // Naranja claro
      text = estadoVtex;
      break;
    case "Aprobado":
      color = '#42A2C2'; // Azul 
      text = estadoVtex;
      break;
//Vtex
    case 'Guia Descargada':
      color = '#42A2C2'; //Azul
      text = estadoVtex;
      break;
    case 'ready for handling':
      color = '#e3310e'; 
      text = estadoVtex;
      break;
    case "Cancelado":
      color = '#FF5050'; //Rojo
      text = estadoVtex;
      break;
    case "Pendiente de pago":
      color = '#FFA500'; //Naranja
      text = estadoVtex;
      break;
    case "Facturado":
      color = '#87d068'; //Verde
      text = estadoVtex;
      break;
    case "Preparacion":
        color = '#BD8989'; // Naranja claro 
        text = estadoVtex;
        break;
    case 'window-to-cancel':
        color = '#950ee3'; // Morado
        text = estadoVtex;
        break;
    case 'payment-approved':
      color = '#42A2C2'; // Azul
      text = estadoVtex;
      break;
    default:
      color = '#4f5d56'; // Gris
      text = 'Cancelando';
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};



const transformData = (list) => {
  if (!Array.isArray(list)) {
    console.error('Expected an array but received:', list);
    return [];
  }

  return list.map((item, index) => ({
    id: index + 1,
    almacen: item.Almacen || 'N/A',
    pedidoVtex: item['Pedido Vtex'] || 'N/A',
    pedidoERP: item['Pedido ERP'] || 'N/A',
    cliente: item.Cliente || 'N/A',
    formaDePago: item['Forma de Pago'] || 'N/A',
    vrPedido: item['V/R Pedido'] || 'N/A',
    fechaPedido: item['Fecha Pedido'] || 'N/A',
    estadoVtex: item.Estado_Vtex || 'N/A',
    estadoSiesa: item.Estado_Siesa || 'N/A',
  }));
};

const transformVendedor = (list) => {
  if (!Array.isArray(list)) {
    console.error('Expected an array but received:', list);
    return [];
  }

  return list.map((item, index) => ({
    id: index + 1,
    //pedidoVtex: item['Pedido Vtex'] || 'N/A',
    //pedidoERP: item['Pedido ERP'] || 'N/A',
    cod: item.Codigo_Vendedor || 'N/A',
    nom: item.Nombre || 'N/A',
  }));
};

const PedidosVtex = () => {
  const [valorCampo, setValorCampo] = useState('');
  const [data, setData] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [vendedor, setVendedor] = useState('');
  const [loading, setLoading] = useState(false);
  const [filtersPedidoVtex, setFiltersPedidosVtex] = useState({
    almacen: '',
    pedidoVtex: '',
    pedidoERP: '',
    cliente: '',
    formaDePago: '',
    vrPedido: '',
    fechaPedido: '',
    estadoVtex: '',
    estadoSiesa: '',
    
  });
  const seleccionarFechaRef = useRef(null);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [allSelected, setAllSelected] = useState(false);



  const handleGenerate = async () => {
    if (vendedor === '') {
      Swal.fire({
        title: "Vendedor NO asignado",
        text: "Debe seleccionar un vendedor para asignarlo a los pedidos.",
        icon: "info"
      });
      return;
    }
    Swal.fire({
      title: `Creando pedido en Siesa...`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const selectedPedidos = currentItems.filter(item => selectedOrders[item.id]);
    const pedidoVtexList = selectedPedidos.map(item => item.pedidoVtex);
    const data = {
      pedidoVtexList: pedidoVtexList,
      vendedor: vendedor,
    };
  
    try {
      const response = await axios.post(`${urlapi}/get-orderDetail`, data);
      const errores = response.data.message; // Lista de errores en JSON
      console.log('Errores:', errores);
      Swal.close();
  
      if (errores.length === 0) {
        Swal.fire({
          title: 'Correcto',
          text: 'Todos los pedidos se han creado en Siesa correctamente.',
          icon: "success",
          confirmButtonText: 'OK'
        });
      } else {
        // Construir el texto para mostrar en el Swal alert
        const uniqueIds = [...new Set(errores.map(error => error['ID de orden']))];

        const errorMessages = uniqueIds
          .map(id => `Pedido ${id}`)
          .join('<br>');

  
        Swal.fire({
          title: 'Completado con errores',
          html: `Los pedidos se completaron con los siguientes errores:<br><br>${errorMessages}<br>Verifique el archivo descargado para ver los detalles.`,
          icon: "info",
          confirmButtonText: 'OK'
        });
  
        // Generar y descargar el archivo Excel con los errores
        const worksheet = XLSX.utils.json_to_sheet(errores, { header: ["ID de orden", "Tercero", "Inventario", "Pedido"] });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Errores");
  
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
  
        // Crear y hacer clic en el enlace de descarga
        const link = document.createElement("a");
        link.href = url;
        link.download = "Errores_Pedidos.xlsx";
        link.click();
  
        // Liberar el URL creado
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      Swal.close();
      console.error('Error sending pedidoVtexList:', error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al procesar los pedidos.",
        icon: "error",
        confirmButtonText: 'OK'
      });
    }
  };
  


  const downloadExcelFile = async () => {
    Swal.fire({
      title: `Generando Guias de pedidos...`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      const selectedPedidos = currentItems.filter(item => selectedOrders[item.id]);
      const pedidoVtexList = selectedPedidos.map(item => item.pedidoVtex);
      const response = await fetch(`${urlapi}/get-guias`, {
        method: 'POST', // Cambia a POST si es necesario
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pedidoVtexList: pedidoVtexList}),
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'guias.xlsx'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        a.remove();
  
        // Leer y procesar el archivo Excel
        const file = new File([blob], 'guias.xlsx');
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet2 = workbook.Sheets[workbook.SheetNames[1]]; // Hoja 2
  
          if (sheet2) {
            const jsonSheet2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });
            const containsError = jsonSheet2.some(row => row.some(cell => typeof cell === 'string' && cell.includes('Error')));
  
            Swal.close();
            if (containsError) {
              Swal.fire({
                title: 'Han ocurrido algunos errores',
                html: `<b>Errores encontrados en la hoja 2:</b><br>${jsonSheet2.slice(1).map(row => row[0]).filter(cell => cell).join('<br>')}`,
                icon: "warning",
                width: 600,
                confirmButtonText: 'OK'
              });
            } else {
              Swal.fire({
                title: 'Excel Generado',
                html: `Documento con guias ha sido descargado<br><b>Revisa tu carpeta de descargas</b>`,
                icon: "success",
                confirmButtonText: 'OK'
              });
            }
          } else {
            Swal.fire({
              title: 'Excel Generado',
              html: `Documento con guias ha sido descargado<br><b>Revisa tu carpeta de descargas</b>`,
              icon: "success",
              confirmButtonText: 'OK'
            });
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        console.error('Error al descargar el archivo');
        Swal.close();
        Swal.fire({
          title: 'No se pudo generar el excel',
          html: `No hay guias disponibles o hubo un problema al descargar el archivo<br><b>Comunicate con el area de sistemas</b>`,
          icon: "error",
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      Swal.close();
      Swal.fire({
        title: 'Error inesperado',
        html: `Hubo un error al generar el archivo<br><b>${error.message}</b>`,
        icon: "error",
        confirmButtonText: 'OK'
      });
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: `Consultando pedidos mas recientes`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        setLoading(true);
        const response = await fetch(`${urlapi}/get-orders`, []);
        const result = await response.json();
        
        const dataToTransform = result.list || result[0]; 
        const transformedData = transformData(dataToTransform);
        
        const vendedores = result.list || result[1];
        const transformedVendedor = transformVendedor(vendedores);

        console.log("Datos recibidos:", transformedData);
        console.log("Vendedores:", transformedVendedor);
        Swal.close();
        setData(transformedData);
        setVendedores(transformedVendedor);

      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBuscarClick = async () => {
    // Limpia los campos antes de ejecutar la lógica
    setSelectedOrders({});
    if (seleccionarFechaRef.current) {
      const { date1, date2 } = seleccionarFechaRef.current.getDates();
  
      if (valorCampo !== '') {
        Swal.fire({
          title: `Consultando pedidos de orden ${valorCampo}`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
      } else {
        if (!date1 || !date2) {
          Swal.fire({
            title: "Filtros inválidos",
            text: "Debe seleccionar un rango de fechas.",
            icon: "info"
          });
          return;
        }
  
        if (date1.isAfter(date2)) {
          Swal.fire({
            title: "Filtros inválidos",
            text: "La fecha inicial debe ser anterior o igual a la fecha final.",
            icon: "info"
          });
          return;
        }
  
        Swal.fire({
          title: `Consultando pedidos de ${date1.format('DD/MMM/YYYY')} a ${date2.format('DD/MMM/YYYY')}`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
  
        console.log('Fecha Inicial:', date1.format('YYYY-MM-DD'));
        console.log('Fecha Final:', date2.format('YYYY-MM-DD'));
      }
  
      try {
        // Solicitud con fetch
        const response = await fetch(`${urlapi}/get-orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([date1, date2, valorCampo]),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Response from API:', result);
  
        const dataToTransform = result.list || result[0];
        console.log("Datos recibidos:", dataToTransform);
  
        const transformedData = transformData(dataToTransform);
        Swal.close();
        setData(transformedData);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al consultar los pedidos. Intente nuevamente más tarde.",
          icon: "error"
        });
      }
    } else {
      console.log('No se ha seleccionado una fecha.');
      Swal.fire({
        title: "Filtros Invalidos",
        text: "Debe seleccionar un rango de fechas o ingresar un numero de pedido '1468170630881-01'",
        icon: "info"
      });
    }
  };
  
  
  
  
  

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFiltersPedidosVtex({
      ...filtersPedidoVtex,
      [name]: value,
    });
  };

  const currentItems = useMemo(() => {
    return data.filter((item) =>
      item.almacen.toLowerCase().includes(filtersPedidoVtex.almacen.toLowerCase()) &&
      item.pedidoVtex.toLowerCase().includes(filtersPedidoVtex.pedidoVtex.toLowerCase()) &&
      item.pedidoERP.toLowerCase().includes(filtersPedidoVtex.pedidoERP.toLowerCase()) &&
      item.cliente.toLowerCase().includes(filtersPedidoVtex.cliente.toLowerCase()) &&
      item.formaDePago.toLowerCase().includes(filtersPedidoVtex.formaDePago.toLowerCase()) &&
      item.vrPedido.toLowerCase().includes(filtersPedidoVtex.vrPedido.toLowerCase()) &&
      item.fechaPedido.toLowerCase().includes(filtersPedidoVtex.fechaPedido.toLowerCase()) &&
      item.estadoVtex.toLowerCase().includes(filtersPedidoVtex.estadoVtex.toLowerCase()) &&
      item.estadoSiesa.toLowerCase().includes(filtersPedidoVtex.estadoSiesa.toLowerCase())
    );
  }, [data, filtersPedidoVtex]);

  const clearSelector = () => {
    setFiltersPedidosVtex({
      almacen: '',
      pedidoVtex: '',
      pedidoERP: '',
      cliente: '',
      formaDePago: '',
      vrPedido: '',
      fechaPedido: '',
      estadoVtex: '',
      estadoSiesa: '',
    });
    setValorCampo(''); // Limpia también el campo de texto
    setSelectedOrders({});
  };

  const handleCheckboxChange = (id) => {
    setSelectedOrders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectedAllChange = () => {
    setAllSelected((prevSelected) => {
      console.log("Cambiando allSelected a:", !prevSelected); // Verificar el cambio de estado
      return !prevSelected;
    });
  };

  const manejarActualizacionValor = (e) => {
    setValorCampo(e.target.value); // Actualiza el valor del campo de texto
  };

  return (
    <section className="pedidosvtex-section">
      <div className="pedidosvtex-ticket-table">
        <h2>
          <a href="/RaggedDigital/Home" className="pedidosvtex-left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          
          {'  '} Generar Pedidos Vtex
        </h2>
        <a href="/RaggedDigital/Mercadeo/Raqstyle/Cartera" className="left" title="Limpiar Campos">
        <i className="bi bi-filter"></i>
      </a>
      {'  '} Filtrar por: 
        <form>
          <div className="pedidosvtex-container">
            <div className="pedidosvtex-multi-selector">
              
                  
                  {/*<div style={{ display: 'flex'}}>
                    <CampoTexto placeholder="Buscar por # pedido:" 
                    value={valorCampo} // Vinculado al estado
                    onChange={manejarActualizacionValor}/>
                    <ListaOpcionesP/>
                  </div>*/}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="perfiles-vtex">
                      <ListaOpcionesP 
                      selectText="Asignar Vendedor" 
                      mode="1" 
                      listas= {vendedores}
                      setSelected={setVendedor}/>
                    </div>
                    <CampoTexto 
                      placeholder="Buscar por # pedido:" 
                      value={valorCampo} // Vinculado al estado
                      onChange={manejarActualizacionValor} 
                    />
                  </div>

                  <div className="row">
                    <div className="col">
                        <div className="separador">
                          <SeleccionarFecha className="component-item" ref={seleccionarFechaRef}/>
                          <BuscarButton className="component-item" onClick={handleBuscarClick} />
                          <BuscarLimpiar onClick={clearSelector} />
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </form>

        <Menu2BotonesG onGenerate={handleGenerate} onDownload={downloadExcelFile} />

        <div className="pedidosvtex-tabla-container">
          <div className="pedidosvtex-tabla-scroll">
            <div className="pedidosvtex-tabla-container">
            <table className="table table-striped table-hover pedidosvtex-ticket-table">
              <thead>
                <tr>
                  <th scope="col" className="pedidosvtex-ticket-table3">#</th>
                  <th scope="col">Almacén</th>
                  <th scope="col" className="pedidosvtex-ticket-table2">Pedido Vtex</th>
                  <th scope="col">Pedido ERP</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Forma de Pago</th>
                  <th scope="col">V/R Pedido</th>
                  <th scope="col">Fecha_Pedido</th>
                  <th scope="col" className="pedidosvtex-ticket-table2">Estado Vtex</th>
                  <th scope="col">Estado Siesa</th>
                  <th scope="col">Seleccionar</th>
                </tr>
                <FilterPedidosVtex filtersPedidosVtex={filtersPedidoVtex} handleFilter={handleFilter}
                allSelected={allSelected}
                setAllSelected={setAllSelected}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                currentItems={currentItems} />

              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.almacen}</td>
                    <td>{item.pedidoVtex}</td>
                    <td>{item.pedidoERP}</td>
                    <td class="align-left">{item.cliente}</td>
                    <td>{item.formaDePago}</td>
                    <td className="text-right">{item.vrPedido}</td>
                    <td>{item.fechaPedido}</td>
                    <td><EstadoFactura estadoVtex={item.estadoVtex} /></td>
                    <td><EstadoFactura estadoVtex={item.estadoSiesa} /></td>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!selectedOrders[item.id]}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PedidosVtex;
