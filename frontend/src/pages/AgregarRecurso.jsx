import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/AgregarRecurso.css";

function AgregarRecurso() {
  return (
    <div className="containerRecurso">
      <NavbarGestionSalas />

      {/* CONTENIDO */}
      <div className="contentRecurso">

        {/* IZQUIERDA */}
        <div className="formSectionRecurso">
            <h1 className="agregarTituloRecurso">Recurso</h1>
        </div>

        {/* DERECHA (VACÍO) */}
        <div className="listSectionRecurso">
          <div className="emptyStateRecurso">
            <p>Aquí se mostrarán las salas creadas</p>
          </div>
        </div>

      </div>

        <div className="footerAgregar">

            <div className="footerLeftAgregar">
                <button className="agregarBtn">Agregar</button>
                <button className="eliminarBtn">Eliminar</button>
            </div>

            <div className="footerCenter"></div>

            <div className="footerRightAgregar">
                <button className="nextBtn">→</button>
            </div>

        </div>
    </div>
  );
}

export default AgregarRecurso;