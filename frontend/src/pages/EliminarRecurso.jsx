import { Link } from "react-router-dom";
import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/EliminarRecurso.css";
import devolver from '../assets/images/devolver.png';

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

      {/* FOOTER */}
      <div className="footer">
        <button className="EliminarBtn">Eliminar</button>
        <Link to="/inicio/GSInicio"> <img src={devolver} alt="devolver" className="devolver" /></Link>
      </div>
    </div>
    );
}

export default EliminarRecurso;