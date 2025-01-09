import React from 'react';
import "./ReporteDane.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Pagination, Tag } from 'antd';
import 'antd/dist/reset.css';
import BotonBuscar from 'src/components/BotonBuscar/BotonBuscar.jsx';
import { Select } from 'antd'; // Importa el componente Select de Ant Design
import Boton from 'src/components/Boton/Boton';

const { Option } = Select;

const ReporteDane = () => {
  return (
    <section>
      <div className="ticket-table">
      <h2>
          <a href="/RaggedDigital/Home" className="left" title="volver">
            <i className="bi bi-arrow-left-circle"></i>
          </a>
          Reporte Nómina Dane
        </h2> 
      <form id="formBuscar" className="mb-3 mt-3" autoComplete="off">
      <div className="row align-items-end">
        <div className="col-12 col-md-5">
          <label htmlFor="marca" className="label-spacing">Periodo</label>
          <div>
            <Select
              style={{ width: 350 }}
              showSearch
              placeholder="Selecciona un Periodo"
              className="w-100"
            >
              {/* Opciones de ejemplo */}
              <Option value="capsula1">202412</Option>
              <Option value="capsula1">202411</Option>
            </Select>
          </div>
        </div>
        <div className="col-12 col-md-5">
            <BotonBuscar/>
        </div>

      </div>
    </form> 
        <div className="col-12 col-md-5">
        <Boton>
            Exportar Excel
        </Boton>
        </div>
        {/* Contenedor con scroll horizontal */}
        <div className="tabla-container">
          <div className="tabla-scroll">
            <table className="table table-striped table-hover">    
            <thead>
            <tr>
              <th colspan="8">Datos Empleado</th>
              <th colspan="3">Perfil Profesional</th>
              <th colspan="10">Devengado</th>
              <th colspan="5">Deducciones</th>
              <th colspan="3">Provisiones</th>
              <th colspan="3">Parafiscales</th>
              <th colspan="4">Prestaciones</th>
            </tr>  
            <tr>
              <th scope="col">#</th>
              <th scope="col">Documento</th>
              <th scope="col">Nombre Empleado</th>
              <th scope="col">Cargo</th>
              <th scope="col">CCostos</th>
              <th scope="col">Sexo</th>
              <th scope="col">CO</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Operario</th>
              <th scope="col">Técnico Tecnólogo</th>
              <th scope="col">Profesional</th>
              <th scope="col">Salario Básico</th>
              <th scope="col">Dias liquidados</th>
              <th scope="col">Salario Devengado</th>
              <th scope="col">Horas Extras</th>
              <th scope="col">Recargos Nocturnos</th>
              <th scope="col">Recargos Nocturnos</th>
              <th scope="col">Trabajo Dominical Festivo</th>
              <th scope="col">Incapacidades</th>
              <th scope="col">Auxilio de Transporte</th>
              <th scope="col">Total Devengado</th>
              <th scope="col">Salud</th>
              <th scope="col">Pensión</th>
              <th scope="col">Fondo Solidaridad Pens</th>
              <th scope="col">Retención en la fuente</th>
              <th scope="col">Otras deducciones</th>
              <th scope="col">Salud</th>
              <th scope="col">Pensión</th>
              <th scope="col">Arl</th>
              <th scope="col">Sena</th>
              <th scope="col">ICBF</th>
              <th scope="col">Caja de Compensación</th>
              <th scope="col">Prima de Servicios</th>
              <th scope="col">Cesantias</th>
              <th scope="col">Interees a las cesantias</th>
              <th scope="col">Vacaciones</th>
            </tr>
          </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>1000348131</td>
                  <td>RIVERA BEJARANO MICHAEL ANDRES</td>
                  <td>ANALISTA AUDITORIA INTERNA</td>
                  <td>M</td>
                  <td>CENTRO DE DISTRIBUCION</td>
                  <td>OFICINA PRINCIPAL</td>
                  <td>MEDELLIN</td>
                  <td>-</td>
                  <td>-</td>
                  <td>X</td>
                  <td>2691100</td>
                  <td>29</td>
                  <td>2578971</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>4036650</td>
                  <td>107644</td>
                  <td>107644</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>228744</td>
                  <td>322932</td>
                  <td>21071</td>
                  <td>53822</td>
                  <td>80733</td>
                  <td>107644</td>
                  <td>336253</td>
                  <td>336253</td>
                  <td>40367</td>
                  <td>107543</td>
                </tr>
            </tbody>
            </table>
            <div className="container-2">
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReporteDane;