import { Link } from "react-router-dom";
import devolver from '../assets/images/devolver.png';
import { useState, useEffect } from "react";
import NavbarGestionSalas from "../components/NavbarGestionSalas";
import "../styles/EditarSala.css";

function EditarSala() {
  const [salas, setSalas] = useState([]);
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    ubicacion: "",
    capacidad: ""
  });
  const [mensaje, setMensaje] = useState("");

  // 🔹 Obtener salas
  const obtenerSalas = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/salas");
      const data = await response.json();
      setSalas(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Cargar al iniciar
  useEffect(() => {
    obtenerSalas();
  }, []);

  // 🔹 Manejar cambios
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Editar sala
  const handleEditar = async () => {
    if (!salaSeleccionada) {
      setMensaje("Selecciona una sala primero");
      return;
    }

    try {
      const res = await fetch(
          `http://localhost:3001/api/salas/${salaSeleccionada.id}/datos`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: form.nombre,
            ubicacion: form.ubicacion,
            capacidad: Number(form.capacidad)
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMensaje("Sala editada exitosamente ✅");

        // 🔥 refrescar lista
        await obtenerSalas();

        // 🔥 limpiar selección
        setSalaSeleccionada(null);
        setForm({
          nombre: "",
          ubicacion: "",
          capacidad: ""
        });

      } else {
        setMensaje(data.error || "Error al editar");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error de conexión");
    }
  };

  return (
    <div className="container">
      <NavbarGestionSalas />

      <div className="content">

        {/* IZQUIERDA - FORMULARIO */}
        <div className="formSection">
          <h3>
            {salaSeleccionada
              ? `Editando Sala ID: ${salaSeleccionada.id}`
              : "Selecciona una sala"}
          </h3>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <div className="formGroup">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Capacidad:</label>
            <input
              type="number"
              name="capacidad"
              value={form.capacidad}
              onChange={handleChange}
            />
          </div>

          <button className="editarBtn" onClick={handleEditar}>
            Editar
          </button>
        </div>

        {/* DERECHA - LISTA */}
        <div className="listSection">
          {salas.length === 0 ? (
            <div className="emptyState">
              <p>No hay salas registradas</p>
            </div>
          ) : (
            salas.map((s) => (
              <div
                key={s.id}
                className={`formGroup salaCard ${
                  salaSeleccionada?.id === s.id ? "activa" : ""
                }`}
                onClick={() => {
                  setSalaSeleccionada(s);
                  setForm({
                    nombre: s.nombre,
                    ubicacion: s.ubicacion,
                    capacidad: s.capacidad
                  });
                  setMensaje("");
                }}
              >
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
        <Link to="/inicio/GSInicio"> <img src={devolver} alt="devolver" className="devolver" /></Link>
      </div>
    </div>
  );
}

export default EditarSala;