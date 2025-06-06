import "./reportePB.css"
import { GiClick } from "react-icons/gi";

function ReportePB() {
    return (
        <section className="center-section">
            <div className="link-container">
                <h1><strong>Reporte Power BI</strong></h1>
                <p className="parrafo-powerbi">Puedes acceder al reporte a través del siguiente enlace <GiClick style={{ marginRight: '0px', verticalAlign: 'middle' }} />:</p>
                <a 
                    href="https://app.powerbi.com/Redirect?action=OpenApp&appId=91e09a3c-6d36-4460-be40-11afd0003f49&ctid=7e404d7c-242e-44b0-8443-15fe0f2bcb55&experience=power-bi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="boton-reporte"
                >


                </a>
            </div>
        </section>
    );
}

export default ReportePB;



 {/*<iframe title="Informe RAGGED 2" width="1600" height="720" src="
        https://app.powerbi.com/view?r=eyJrIjoiOGQyZjY5ZjAtZTgzYS00MjM5LWFmYTctMzYyZWEyZmU5NjlmIiwidCI6IjdlNDA0ZDdjLTI0MmUtNDRiMC04NDQzLTE1ZmUwZjJiY2I1NSIsImMiOjR9&pageName=ReportSection"
        frameborder="0" allowFullScreen="true"></iframe>*/}