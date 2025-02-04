import React, { useState, useEffect } from 'react';
import MultiSelector from '../../components/MultiSelector/MultiSelector.jsx';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import { TbHandClick } from "react-icons/tb";
import { urlapi } from '../../App';
import './Marketplace.css';

const Marketplace = () => {
  // Estados para almacenar los valores seleccionados
  const [marketplaces, setMarketplaces] = useState([]);
  const [selectedMarketplace, setSelectedMarketplace] = useState(null); // Estado para la opción seleccionada
  const [coleccion, setColeccion] = useState([]);
  const [referencias, setReferencias] = useState([]);
  const [color, setColor] = useState([]);
  const [tipoArchivoOptions, setTipoArchivoOptions] = useState([]); // Lista de tipos de archivo
  const [selectedTipoArchivo, setSelectedTipoArchivo] = useState(null); // Tipo de archivo seleccionado
  const [tiposArchivo, setTiposArchivo] = useState([]);

  // Función para obtener los datos del backend
  const fetchMarketplaces = async () => {
    try {
        const response = await fetch(`${urlapi}/vtaDirecta/get-ConsultarMarcketplace`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Datos recibidos del backend:", data); // Verificar estructura

        if (Array.isArray(data) && data.length > 0) {
          const options = data
              .filter(item => item?.nombre) // Filtrar solo los que tienen nombre
              .map(item => ({
                  label: item.nombre,
                  value: item.nombre
              }));
      
          setMarketplaces(options);
          console.log("Opciones en MultiSelector después de cargar:", options);
      } else {
          console.error("Formato de datos incorrecto o vacío:", data);
      }
    } catch (error) {
        console.error("Error al obtener marketplaces:", error);
    }
};


// Cargar datos cuando el componente se monta
useEffect(() => {
  fetchMarketplaces();
}, []);

// 🔹 Obtener tipos de archivo desde el backend
const fetchTipoArchivo = async () => {
  try {
    const response = await fetch(`${urlapi}/vtaDirecta/get-ConsultarTipoArchivo`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();
    console.log("Tipos de archivo recibidos:", data);

    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter(item => item?.nombre)
        .map(item => ({ label: item.nombre, value: item.nombre }));
    } else {
      console.error("Formato incorrecto o vacío:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener tipos de archivo:", error);
    return [];
  }
};

useEffect(() => {
  if (selectedMarketplace === "Falabella") {
      fetchTipoArchivo().then(setTiposArchivo);
  } else {
      setTiposArchivo([]); // Vaciar opciones si se selecciona otro marketplace
      setSelectedTipoArchivo(null); // Resetear selección
  }
}, [selectedMarketplace]);


const options = [
  { label: "Seleccione un Marketplace", value: "" }, // 🔹 Opción vacía
  ...marketplaces
];

// Manejar selección del marketplace
const handleMarketplaceChange = async (value) => {
  setSelectedMarketplace(value);

  if (value === "Falabella") {
    const tipos = await fetchTipoArchivo();
    setTipoArchivoOptions(tipos);
  } else {
    setTipoArchivoOptions([]);
    setSelectedTipoArchivo(null);
  }
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
              opc="0"
              placeholder="Marketplace"
              options={options}
              onChange={setSelectedMarketplace}
              value={selectedMarketplace}
            />
            <Select
              style={{ width: 270 }}
              placeholder="Tipo de archivo"
              options={tiposArchivo}
              onChange={setSelectedTipoArchivo}
              value={selectedTipoArchivo}
              disabled={selectedMarketplace !== "Falabella"} // Deshabilitar si no es "Falabella"
          />

            <MultiSelector
              options={[
                { label: 'Ref001', value: 'ref001' },
                { label: 'Ref002', value: 'ref002' },
              ]}
              opc="0"
              placeholder="Referencias"
              onSelectChange={setReferencias} // Actualiza el estado
              value={referencias} // Valor seleccionado
            />
            </div>
            <div className="row-3">
              <MultiSelector
                options={[
                  { label: 'Rojo', value: 'rojo' },
                  { label: 'Azul', value: 'azul' },
                ]}
                opc="0"
                placeholder="Color"
                onSelectChange={setColor} // Actualiza el estado
                value={color} // Valor seleccionado
              />

              <MultiSelector
                options={[
                  { label: 'Verano', value: 'verano' },
                  { label: 'Invierno', value: 'invierno' },
                ]}
                opc="1"
                placeholder="Colección"
                onSelectChange={setColeccion} // Actualiza el estado
                value={coleccion} // Valor seleccionado
              />

              <div className="col-12 col-md-5">
                <BotonBuscar onClick="{}" />
              </div>
            </div>
          </div>
        </form>
        {/* Aquí puedes agregar el código para renderizar los datos de la tabla */}
      </div>
      <table className="table table-striped table-hover">
        <tbody>
            {/* Ejemplo de datos estáticos */}
            <tr>
            <td colSpan="9">
                <TbHandClick style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                Seleccione las diferentes opciones para mostrar datos.
            </td>
            </tr>
        </tbody>
        </table>
    </section>
  );
};

export default Marketplace;
