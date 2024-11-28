import React, { useState } from 'react';
import AdjuntarArchivoP from "../../components/AdjuntarArchivo/AdjuntarArchivoP";
import Boton from "../../components/Boton/Boton";
import ListaOpcionesP from "../../components/ListaOpciones/ListaOpcionesP";
import Swal from 'sweetalert2';
import { urlapi } from '../../App';

const PublicarCatalogo = () => {
  const [Ruta, setRuta] = useState(''); // Ruta seleccionada
  const [Archivo, setArchivo] = useState(null); // Archivo seleccionado

  const onPublicarCatalogo = async (e) => {
    e.preventDefault();
  
    if (!Ruta || !Archivo) {
      Swal.fire("Error", "Debe seleccionar un elemento y un archivo.", "error");
      return;
    }
  
    try {
      Swal.fire({
        title: 'Actualizando nuevo catalogo...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      // Extraer el nombre del archivo de la ruta
      const rutaFinal = Ruta.split("\\").pop();
  
      // Leer el archivo como un array de bytes
      const arrayBuffer = await Archivo.arrayBuffer();
      const byteArray = Array.from(new Uint8Array(arrayBuffer));
  
      // Construir el objeto a enviar
      const data = {
        archivo: byteArray, // El archivo como un array de bytes
        ruta: Ruta,         // Ruta seleccionada
        nombreArchivo: rutaFinal, // Nombre del archivo
      };
  
      // Realizar la solicitud al servidor
      const response = await fetch(`${urlapi}/subir-catalogo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Procesar la respuesta
      if (response.ok) {
        Swal.fire("Éxito", "El archivo se ha publicado correctamente.", "success");
      } else {
        const errorMsg = await response.text();
        Swal.fire("Error", `No se pudo publicar el archivo, Comuniquese con el area de sistemas. ${errorMsg}`, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema al enviar los datos, Comuniquese con el area de sistemas.", "error");
      console.error("Error al publicar catálogo:", error);
    }
  };
  
  

  return (
    <section className="formulario">
      <form onSubmit={onPublicarCatalogo}>
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {'  '}
          Venta Directa.
        </h2>
        <ListaOpcionesP
          listas={[
            ["C:\\inetpub\\wwwroot\\Proyecto TransUnion\\Transunion\\assets\\NuevaCapsula-6eecf261.pdf", "Catalogo"],
            ["C:\\inetpub\\wwwroot\\Proyecto TransUnion\\Transunion\\assets\\BANNER-84fb18ae.png", "Banner Principal"],
          ]}
          label="Elemento a modificar:"
          selectText="Seleccionar..."
          setSelected={setRuta}
        />
        <br />
        <AdjuntarArchivoP setFile={setArchivo} />
        <Boton>
          Publicar Catálogo
        </Boton>
      </form>
    </section>
  );
};

export default PublicarCatalogo;
