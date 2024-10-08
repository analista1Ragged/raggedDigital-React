import React, { useState } from 'react';
import "./NominaElectronica.css";
import ListaOpcionesP from '../../components/ListaOpciones/ListaOpcionesP';
import Boton from '../../components/Boton/Boton';
import SeleccionarFechaP from '../../components/SeleccionarFecha/SeleccionarFechaP';
import { urlapi } from '../../App';
import axios from "axios";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';


// Función para transformar los datos y organizar las columnas
const transformData1 = (list) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }

  // Reordenar las columnas para el primer array (Datos Trabajadores)
  return list.map((item) => ({
    Indice: item.Indice || '',
    NumeroTrabajador: item.NumeroTrabajador || '',
    "Tipo documento": item["Tipo documento"] || '',
    TipoNomina: item.TipoNomina || '',
    TipoNota: item.TipoNota || '',
    DocRef: item.DocRef || '',
    CUNERef: item.CUNERef || '',
    Fecha: item.Fecha || '',
    FechaInicio: item.FechaInicio || '',
    FechaFin: item.FechaFin || ''
  }));
};

const transformData2 = (list) => {
  if (!Array.isArray(list)) {
    console.error("Expected an array but received:", list);
    return [];
  }

  // Reordenar las columnas para el segundo array (Conceptos de Pago)
  return list.map((item) => ({
    Indice: item.Indice || '',
    Concepto: item.Concepto || '',
    Tipo: item.Tipo || '',
    Pago: item.Pago || 0,
    Porcentaje: item.Porcentaje || '',
    CantidadDias: item.CantidadDias || '',
    FechaInicio: item.FechaInicio || '',
    FechaFin: item.FechaFin || '',
    CantidadHoras: item.CantidadHoras || ''
  }));
};

const NominaElectronica = () => {
  const [fecha, setFecha] = React.useState(null);
  const [unidadNegocio, setUnidadNegocio] = React.useState('');

  // Función para formatear la fecha a AAAAMMDD
  const formatFecha = (date) => {
    return dayjs(date).format('YYYYMMDD');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!fecha || !unidadNegocio) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar una fecha y una unidad de negocio.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      Swal.fire({
        title: `Consultando pedidos mas recientes`,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const formattedFecha = formatFecha(fecha); // Convertir la fecha al formato adecuado
      console.log(formattedFecha,unidadNegocio)
      
      const response = await axios.post(urlapi + '/get-nomina', {
        fecha: formattedFecha, // Enviar la fecha formateada
        unidadNegocio: unidadNegocio, // Enviar la unidad de negocio seleccionada
      });
      console.log(response.data.message[0])
      if (response.data.message[0].length==0) {
        Swal.fire({
          title: 'Error',
          text: 'No se encontro informacion para la fecha seleccionada.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Procesar los datos recibidos
      const array1 = response.data.message[0];
      const array2 = response.data.message[1];

      // Transformar y reordenar ambos arrays
      const data1 = transformData1(array1);
      const data2 = transformData2(array2);

      // Crear hojas de cálculo
      const worksheet1 = XLSX.utils.json_to_sheet(data1);
      const worksheet2 = XLSX.utils.json_to_sheet(data2);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet1, 'Encabezado');
      XLSX.utils.book_append_sheet(workbook, worksheet2, 'Detalle');

      XLSX.writeFile(workbook, "NominaElectronica.xlsx");
      Swal.close();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al descargar el archivo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error en la descarga:', error);
    }
  };

  return (
    <section className="formulario">
      
      <h2>
        <a href="/RaggedDigital/Home" className="left" title="volver">
          <i className="bi bi-arrow-left-circle"></i>
        </a>
        {'  '}
        Informe de nómina electrónica.
        {'  '}
      </h2>
      <form onSubmit={handleSubmit}>
      
        <SeleccionarFechaP onDate1Change={setFecha} />
        <ListaOpcionesP
          listas={[["HE", "Rancho Guadalupe"], ["HL", "Hacienda Amparo"]]}
          label="Seleccionar unidad de negocio."
          selectText="Seleccionar..."
          setSelectedBanco={setUnidadNegocio}
        />
        <Boton type="submit" texto="Enviar">
          Descargar Nómina
        </Boton>
      </form>
    </section>
  );
};

export default NominaElectronica;
