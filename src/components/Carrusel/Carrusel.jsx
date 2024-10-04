import React from 'react';
import { Carousel } from 'antd';
import './Carrusel.css'; // Importar el archivo CSS para los estilos

const Carrusel = () => {
  const onChange = (current) => {
    console.log(current);
  };

  return (
    <Carousel effect="fade">
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </Carousel>
  );
};

export default Carrusel;

