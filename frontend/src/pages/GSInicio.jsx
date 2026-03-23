import { Link } from "react-router-dom";
import NavbarGestionSalas from '../components/NavbarGestionSalas';
import '../styles/GSInicio.css'; 
import crearSala from '../assets/images/crearSala.png';
import editarSala from '../assets/images/editarSala.png';
import actualizarSala from '../assets/images/actualizarSala.png';
import agregarRecurso from '../assets/images/agregarRecurso.png';
import eliminarRecurso from '../assets/images/eliminarRecurso.png';
import devolver from '../assets/images/devolver.png';

function GSInicio() {
  return (
    <div className="gsContainer">
      <NavbarGestionSalas userRole="" />
      
      <div className="gsContent">
        <div className="gsHeader">
          <h1 className="gsTitulo">Gestión de Salas</h1>
          <p className="gsSubtitulo">Administra las salas y recursos tecnológicos</p>
          <div className="gsLinea"></div>
        </div>

        <div className="gsSalaContainer">
          {/* Crear sala */}
          <div className="gsCrearSala">
            <p className="gscrearSalaTitleTitle">Crear sala</p>
            <Link to="/inicio/crear"><img src={crearSala} alt="Crear sala" className="gsCrearSalaImage" /></Link>
          </div>

          {/* Editar sala */}
          <div className="gsEditarSala">
            <p className="gsEditarSalaTitle">Editar sala</p>
            <Link to="/inicio/editar"><img src={editarSala} alt="Editar sala" className="gsEditarSalaImage" /></Link>
          </div>

          {/* Actualizar estado sala */}
          <div className="gsActualizarSala">
            <p className="gsActualizarSalaTitle">Actualizar Estado sala</p>
            <Link to="/inicio/actualizarEstado"><img src={actualizarSala} alt="Actualizar sala" className="gsActualizarSalaImage" /></Link>
          </div>

          {/* Agregar recurso tecnológico */}
          <div className="gsAgregarRecurso">
            <p className="gsAgregarRecursoTitle">Agregar recursos tecnológicos </p>
            <Link to="/inicio/AgregarRecurso"><img src={agregarRecurso} alt="Agregar recurso" className="gsAgregarRecursoImage" /></Link>
          </div>

          {/* Eliminar recurso tecnológico */}
          <div className="gsEliminarRecurso">
            <p className="gsEliminarRecursoTitle">Eliminar recursos tecnológicos</p>
            <Link to="/inicio/EliminarRecurso"><img src={eliminarRecurso} alt="Eliminar recurso" className="gsEliminarRecursoImage" /></Link>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="footerInicio">
        <Link to="/Secretaria"> <img src={devolver} alt="devolver" className="devolverInicio" /></Link>
      </div>
    </div>
  );
}

export default GSInicio;