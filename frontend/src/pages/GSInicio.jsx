import NavbarGestionSalas from '../components/NavbarGestionSalas';
import '../styles/GSInicio.css'; 
import crearSala from '../assets/images/crearSala.png';
import editarSala from '../assets/images/editarSala.png';
import actualizarSala from '../assets/images/actualizarSala.png';
import agregarRecurso from '../assets/images/agregarRecurso.png';
import eliminarRecurso from '../assets/images/eliminarRecurso.png';

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
            <img src={crearSala} alt="Crear sala" className="gsCrearSalaImage" />
          </div>

          {/* Editar sala */}
          <div className="gsEditarSala">
            <p className="gsEditarSalaTitle">Editar sala</p>
            <img src={editarSala} alt="Editar sala" className="gsEditarSalaImage" />
          </div>

          {/* Actualizar estado sala */}
          <div className="gsActualizarSala">
            <p className="gsActualizarSalaTitle">Actualizar sala</p>
            <img src={actualizarSala} alt="Actualizar sala" className="gsActualizarSalaImage" />
          </div>

          {/* Agregar recurso tecnológico */}
          <div className="gsAgregarRecurso">
            <p className="gsAgregarRecursoTitle">Agregar recurso</p>
            <img src={agregarRecurso} alt="Agregar recurso" className="gsAgregarRecursoImage" />
          </div>

          {/* Eliminar recurso tecnológico */}
          <div className="gsEliminarRecurso">
            <p className="gsEliminarRecursoTitle">Eliminar recurso</p>
            <img src={eliminarRecurso} alt="Eliminar recurso" className="gsEliminarRecursoImage" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GSInicio;