import "./reportePB.css"

function ReportePB() {
    
    return (
    <section className="center-section">
        <div class="iframe-container">
            <iframe 
                title="BI-TALENTO HUMANO"
                src="https://app.powerbi.com/reportEmbed?reportId=29e780b7-cccf-4f96-b932-ee9f2d9241fe&appId=1f93da0c-c541-43e9-a0bb-cac3dac8fb2f&autoAuth=true&ctid=7e404d7c-242e-44b0-8443-15fe0f2bcb55"
                frameborder="0"
                allowfullscreen="true">
            </iframe>
        </div>
        {/*<iframe title="Informe RAGGED 2" width="1080" height="720" src="
        https://app.powerbi.com/view?r=eyJrIjoiOGQyZjY5ZjAtZTgzYS00MjM5LWFmYTctMzYyZWEyZmU5NjlmIiwidCI6IjdlNDA0ZDdjLTI0MmUtNDRiMC04NDQzLTE1ZmUwZjJiY2I1NSIsImMiOjR9&pageName=ReportSection"
        frameborder="0" allowFullScreen="true"></iframe>*/}
    </section>
    )
}

export default ReportePB