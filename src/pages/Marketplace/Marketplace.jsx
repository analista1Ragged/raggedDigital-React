import React, { useState } from 'react';
import MultiSelector from '../../components/MultiSelector/MultiSelector.jsx';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import './Marketplace.css';

const Marketplace = () => {
  // Estados para almacenar los valores seleccionados
  const [marketplace, setMarketplace] = useState([]);
  const [coleccion, setColeccion] = useState([]);
  const [referencias, setReferencias] = useState([]);
  const [color, setColor] = useState([]);
  const [tipoArchivo, setTipoArchivo] = useState([]);

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
              <MultiSelector
                options={[
                  { label: 'Amazon', value: 'amazon' },
                  { label: 'eBay', value: 'ebay' },
                ]}
                opc="0"
                placeholder="Marketplace"
                onSelectChange={setMarketplace} // Actualiza el estado
                value={marketplace} // Valor seleccionado
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
                  { label: 'PDF', value: 'pdf' },
                  { label: 'Excel', value: 'excel' },
                ]}
                opc="1"
                placeholder="Tipo de archivo"
                onSelectChange={setTipoArchivo} // Actualiza el estado
                value={tipoArchivo} // Valor seleccionado
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
            <td colSpan="8">Seleccione un marketplace para mostrar datos.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Marketplace;
