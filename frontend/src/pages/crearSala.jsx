import { useState, useEffect } from "react";
import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/crearSala.css";

function CrearSala() {

  const [sala, setSala] = useState({
    id: "",
    nombre: "",
    ubicacion: "",
    capacidad: "",
    estado: "disponible"
  });

  // 🔥 NUEVO: estado para lista de salas
  const [salas, setSalas] = useState([]);

  // 🔥 NUEVO: función para obtener salas
  const obtenerSalas = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/salas");
      const data = await response.json();
      setSalas(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 NUEVO: cargar al inicio
  useEffect(() => {
    obtenerSalas();
  }, []);

  const crearSala = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/salas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id:(sala.id),
          nombre: sala.nombre,
          ubicacion: sala.ubicacion,
          capacidad: Number(sala.capacidad),
          estado: sala.estado.toLowerCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(JSON.stringify(data));
        return;
      }

      alert("Sala creada correctamente ✅");

      // 🔥 NUEVO: actualizar lista
      await obtenerSalas();

      // Limpiar formulario
      setSala({
        id: "",
        nombre: "",
        ubicacion: "",
        capacidad: "",
        estado: "disponible"
      });

    } catch (error) {
      console.error(error);
      alert("Error conectando con el servidor");
    }
  };

  return (
    <div className="container">
      <NavbarGestionSalas />

      {/* CONTENIDO */}
      <div className="content">

        {/* IZQUIERDA */}
        <div className="formSection">

          <div className="formGroup">
            <label>Codigo Sala</label>
            <input
              type="text"
              value={sala.id}
              onChange={(e) => setSala({ ...sala, id: e.target.value })}
            />
          </div>

          <div className="formGroup">
            <label>Nombre:</label>
            <input
              type="text"
              value={sala.nombre}
              onChange={(e) => setSala({ ...sala, nombre: e.target.value })}
            />
          </div>

          <div className="formGroup">
            <label>Ubicación:</label>
            <input
              type="text"
              value={sala.ubicacion}
              onChange={(e) => setSala({ ...sala, ubicacion: e.target.value })}
            />
          </div>

          <div className="formGroup">
            <label>Capacidad:</label>
            <input
              type="number"
              value={sala.capacidad}
              onChange={(e) => setSala({ ...sala, capacidad: e.target.value })}
            />
          </div>

          <div className="formGroup">
            <label>Estado:</label>
            <select
              value={sala.estado}
              onChange={(e) => setSala({ ...sala, estado: e.target.value })}
            >
              <option value="disponible">Disponible</option>
              <option value="ocupado">Ocupado</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <button className="crearBtn" onClick={crearSala}>
            Crear
          </button>
        </div>

        {/* DERECHA */}
        <div className="listSection">

          {salas.length === 0 ? (
            <div className="emptyState">
              <p>Aquí se mostrarán las salas creadas</p>
            </div>
          ) : (
            salas.map((s) => (
              <div key={s.id} className="formGroup salaCard">
  
                <div className="salaHeader">
                  <h3 className="salaTitulo">{s.nombre}</h3>
                </div>

                <div className="salaInfo">
                  <p><strong>ID:</strong> {s.id}</p>
                  <p><strong>Ubicación:</strong> {s.ubicacion}</p>
                  <p><strong>Capacidad:</strong> {s.capacidad}</p>
                </div>

                <span className={`estado ${s.estado}`}>
                    {s.estado}
                </span>

              </div>
            ))
          )}

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