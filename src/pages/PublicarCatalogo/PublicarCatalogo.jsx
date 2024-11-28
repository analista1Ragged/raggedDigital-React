import React, { useState } from 'react';
import AdjuntarArchivoP from "../../components/AdjuntarArchivo/AdjuntarArchivoP";
import Boton from "../../components/Boton/Boton";
import ListaOpcionesP from "../../components/ListaOpciones/ListaOpcionesP";
import Swal from "sweetalert2";

const PublicarCatalogo = () => {
  const [Ruta, setRuta] = useState(""); // Ruta seleccionada
  const [Archivo, setArchivo] = useState(null); // Archivo seleccionado
  const [archivosSimulados, setArchivosSimulados] = useState({}); // Simulación de archivos en rutas

  const onPublicarCatalogo = (e) => {
    e.preventDefault();

    if (!Ruta || !Archivo) {
      Swal.fire("Error", "Debe seleccionar un elemento y un archivo.", "error");
      return;
    }

    const rutaFinal = Ruta.split("\\").pop(); // Nombre del archivo en la ruta

    // Simula el reemplazo del archivo en la "ruta"
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result; // Contenido del archivo
      setArchivosSimulados((prevState) => ({
        ...prevState,
        [rutaFinal]: fileContent, // Reemplaza el archivo en la "ruta"
      }));

      Swal.fire(
        "Éxito",
        `El archivo ha sido reemplazado en la ruta virtual: ${rutaFinal}`,
        "success"
      );
    };
    reader.readAsDataURL(Archivo); // Convierte el archivo a Base64 para simular su contenido
  };

  return (
    <section className="formulario">
      <form onSubmit={onPublicarCatalogo}>
        <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          {"  "}
          Venta Directa.
        </h2>
        <ListaOpcionesP
          listas={[
            [
              "C:\\inetpub\\wwwroot\\Proyecto TransUnion\\Transunion\\assets\\NuevaCapsula-6eecf261.pdf",
              "Catalogo",
            ],
            [
              "C:\\inetpub\\wwwroot\\Proyecto TransUnion\\Transunion\\assets\\BANNER-84fb18ae.png",
              "Banner Principal",
            ],
          ]}
          label="Elemento a modificar."
          selectText="Seleccionar..."
          setSelected={setRuta}
        />
        <br />
        <AdjuntarArchivoP uploadPath={Ruta} setFile={setArchivo} />
        <Boton>
          Publicar Catálogo
        </Boton>
      </form>

      {/* Mostrar rutas simuladas */}
      <section>
        <h3>Rutas simuladas:</h3>
        <ul>
          {Object.entries(archivosSimulados).map(([ruta, contenido]) => (
            <li key={ruta}>
              <strong>{ruta}:</strong> {contenido.slice(0, 50)}...
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default PublicarCatalogo;
