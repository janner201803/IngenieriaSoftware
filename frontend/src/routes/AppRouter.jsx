import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/docente"
          element={user?.rol === 'docente' ? <InicioDocente /> : <Navigate to="/login" />}
        />
        <Route
          path="/secretaria"
          element={user?.rol === 'secretaria' ? <InicioSecretaria /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/inicio/crear" element={<CrearSala/>}/>
        <Route path="/inicio/GSInicio" element={<GSInicio />} />
        <Route path="/inicio/editar" element={<EditarSala />} />
        <Route path="/inicio/AgregarRecurso" element={<AgregarRecurso />} />
        <Route path="/inicio/actualizarEstado" element={<EditarEstado />} />
        <Route path="/inicio/EliminarRecurso" element={<EliminarRecurso />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;