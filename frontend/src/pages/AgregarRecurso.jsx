import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/AgregarRecurso.css";
import FooterRojo from "../components/FooterRojo";

function AgregarRecurso() {
  return (
    <div className="container">
      <NavbarGestionSalas />

      {/* CONTENIDO */}
      <div className="content">

        {/* IZQUIERDA */}
        <div className="formSection">
          <h1>Recursos</h1>
        </div>

        {/* DERECHA */}
        <div className="listSection">

        </div>

      </div>
      
      <FooterRojo>
        <button className="AgregarBtn">Agregar</button>
      </FooterRojo>
        
    </div>
  );
}


export default AgregarRecurso;