import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import InicioDocente from '../pages/InicioDocente';
import InicioSecretaria from '../pages/InicioSecretaria';
import CrearSala from '../pages/crearSala';
import GSInicio from "../pages/GSInicio";
import EditarSala from "../pages/EditarSala";
import AgregarRecurso from '../pages/AgregarRecurso';
import EditarEstado from "../pages/EditarEstado";
import EliminarRecurso from '../pages/EliminarRecurso';
import GestionarReservas from '../pages/GestionarReservas';

const AppRouter = () => {
  const { user, loading } = useAuth();

  // 🔄 Mientras valida sesión
  if (loading) return <p>Cargando...</p>;

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Públicas */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Si ya está logueado, no entra a login */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />

        <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/" />} 
        />

        {/* 🔐 Rutas por rol */}
        <Route
          path="/docente"
          element={
            <PrivateRoute rolPermitido="docente">
              <InicioDocente />
            </PrivateRoute>
          }
        />

        <Route
          path="/secretaria"
          element={
            <PrivateRoute rolPermitido="secretaria">
              <InicioSecretaria />
            </PrivateRoute>
          }
        />

        {/* 🔐 TODAS LAS RUTAS PROTEGIDAS */}
        <Route path="/inicio/crear" element={
          <PrivateRoute>
            <CrearSala />
          </PrivateRoute>
        } />

        <Route path="/inicio/GSInicio" element={
          <PrivateRoute>
            <GSInicio />
          </PrivateRoute>
        } />

        <Route path="/inicio/editar" element={
          <PrivateRoute>
            <EditarSala />
          </PrivateRoute>
        } />

        <Route path="/inicio/AgregarRecurso" element={
          <PrivateRoute>
            <AgregarRecurso />
          </PrivateRoute>
        } />

        <Route path="/inicio/actualizarEstado" element={
          <PrivateRoute>
            <EditarEstado />
          </PrivateRoute>
        } />

        <Route path="/inicio/EliminarRecurso" element={
          <PrivateRoute>
            <EliminarRecurso />
          </PrivateRoute>
        } />

        <Route path="/inicio/GestionarReservas" element={
          <PrivateRoute>
            <GestionarReservas />
          </PrivateRoute>
        } />

        {/* 🔁 Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;