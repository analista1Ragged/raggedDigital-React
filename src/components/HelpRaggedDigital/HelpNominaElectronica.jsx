import React from 'react';
import "./HelpNominaElectronica.css";

// Componente que renderiza una presentación de PowerPoint usando iframe
const PowerPoint = ({ src }) => {
  return (
    <section className="center-section">
      <div style={{ position: 'relative', width: '100%', height: 'calc(118.5vh - 100px)', overflow: 'hidden' }}>
        <iframe 
          src={src}  // Usar la prop src aquí
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            border: 'none', // Elimina el borde del iframe
            margin: 0, 
            padding: 0 
          }} 
          allowfullscreen="true" 
          mozallowfullscreen="true">
        </iframe>
      </div>
    </section>
  );
};

export default PowerPoint;

