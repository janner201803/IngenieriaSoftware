import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import InicioDocente from '../pages/InicioDocente';
import InicioSecretaria from '../pages/InicioSecretaria';

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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;