import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import InicioDocente from '../pages/InicioDocente';
import InicioSecretaria from '../pages/InicioSecretaria';
import CrearSala from '../pages/crearSala';
import GSInicio from '../pages/GSInicio';
import EditarSala from '../pages/EditarSala';
import AgregarRecurso from '../pages/AgregarRecurso';
import EditarEstado from '../pages/EditarEstado';
import EliminarRecurso from '../pages/EliminarRecurso';
import GestionarReservas from '../pages/GestionarReservas';

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Rutas privadas (requieren autenticación) */}
      <Route
        path="/docente"
        element={user?.rol === 'docente' ? <InicioDocente /> : <Navigate to="/login" />}
      />
      <Route
        path="/secretaria"
        element={user?.rol === 'secretaria' ? <InicioSecretaria /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/crear"
        element={user ? <CrearSala /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/GSInicio"
        element={user ? <GSInicio /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/editar"
        element={user ? <EditarSala /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/AgregarRecurso"
        element={user ? <AgregarRecurso /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/actualizarEstado"
        element={user ? <EditarEstado /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/EliminarRecurso"
        element={user ? <EliminarRecurso /> : <Navigate to="/login" />}
      />
      <Route
        path="/inicio/GestionarReservas"
        element={user ? <GestionarReservas /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;