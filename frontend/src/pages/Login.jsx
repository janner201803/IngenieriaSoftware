import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import avatar from "../assets/images/avatar.png";

function Login() {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(correo, contraseña);

            // 🔥 VALIDAR RESPUESTA
            if (result && result.user) {

            if (result.user.rol === 'docente') {
                navigate('/docente');
            } else if (result.user.rol === 'secretaria') {
                navigate('/secretaria');
            } else {
                navigate('/');
            }

            } else {
            setError('Error en login');
            }

        } catch (err) {
            setError(err.message);
        }
    };
  return (
    <div>
        <div className="loginContainer">
            <Navbar />
            <div className="loginContent">
                <form onSubmit={handleSubmit} className="login">
                    <img src={avatar} alt="avatar" className="avatar"/>
                    <input
                        className="correo"
                        placeholder="Correo"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <input
                        className="contraseña"
                        placeholder="Password"
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button className="ingresar" type ="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </button>
                </form>
                <p className="texto">Welcome Back</p>
            </div>
        </div>
    </div>
  );
}

export default Login;