import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/crearSala.css";

function CrearSala() {
  return (
    <div className="container">
      <NavbarGestionSalas />

      {/* CONTENIDO */}
      <div className="content">

        {/* IZQUIERDA */}
        <div className="formSection">
          <h3>Sala No°</h3>

          <div className="formGroup">
            <label>Nombre:</label>
            <input type="text" />
          </div>

          <div className="formGroup">
            <label>Ubicación:</label>
            <input type="text" />
          </div>

          <div className="formGroup">
            <label>Capacidad:</label>
            <input type="number" />
          </div>

          <div className="formGroup">
            <label>Estado:</label>
            <select>
              <option>Disponible</option>
              <option>Ocupado</option>
            </select>
          </div>

          <button className="crearBtn">Crear</button>
        </div>

        {/* DERECHA (VACÍO) */}
        <div className="listSection">
          <div className="emptyState">
            <p>Aquí se mostrarán las salas creadas</p>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="footer">
        <button className="nextBtn">→</button>
      </div>
    </div>
  );
}

export default CrearSala;