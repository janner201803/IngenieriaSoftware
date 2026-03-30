import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/EliminarRecurso.css";
import FooterRojo from "../components/FooterRojo";

function EliminarRecurso() {
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
      <button className="EliminarBtn">Eliminar</button>
      </FooterRojo>  
      
    </div>
    );
}

export default EliminarRecurso;