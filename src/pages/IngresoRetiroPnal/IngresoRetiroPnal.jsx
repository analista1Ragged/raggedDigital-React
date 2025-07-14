
import { GiClick } from "react-icons/gi";

function IngresoRetiroPnal() {
    return (
        <section className="center-section">
            <div className="link-container">
                <h1><strong>Reporte Power BI</strong></h1>
                <p className="parrafo-powerbi">Puedes acceder al reporte a través del siguiente enlace <GiClick style={{ marginRight: '0px', verticalAlign: 'middle' }} />:</p>
                <a 
                    href="https://forms.cloud.microsoft/r/NHbkWWV88y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="boton-reporte"
                >
                </a>
            </div>
        </section>
    );
}

export default IngresoRetiroPnal;