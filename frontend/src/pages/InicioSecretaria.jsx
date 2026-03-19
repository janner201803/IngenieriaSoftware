import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
// Si tienes estilos específicos para esta página, descomenta la siguiente línea
// import '../styles/InicioSecretaria.css';

function InicioSecretaria() {
  const { user, logout } = useAuth();

  return (
    <div className="inicio-secretaria-container">
      <Navbar />
      <div className="inicio-secretaria-content">
        <h1>Panel de Secretaria</h1>
        <p>Bienvenida, {user?.nombre || user?.correo} (Rol: {user?.rol})</p>
        <button onClick={logout} className="logout-btn">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default InicioSecretaria;