import React, { useState } from 'react';
import axios from 'axios';
//import './App.css';  // Asegúrate de que los estilos estén definidos en App.css o en tu archivo CSS correspondiente

function Test() {
    const [inputValue, setInputValue] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Llama a tu función aquí. Por ejemplo, una solicitud a tu API Flask
            const response = await axios.get(`http://127.0.0.1:5000/getApi/${inputValue}`);
            setTableData([response.data]);  // Assuming the response data is an array or an object to be displayed in a table
        } catch (error) {
            console.error('Error al llamar a la función:', error);
        }
    };

    return (
        <div className="container">
            
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="inputField">Ingrese el valor:</label>
                    <input
                        type="text"
                        id="inputField"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Progreso</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.progreso}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Test;
