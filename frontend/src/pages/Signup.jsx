import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFacultades } from '../services/api';
import Navbar from "../components/Navbar";
import "../styles/Signup.css";
import avatar from "../assets/images/avatar.png";

function Signup() {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [idFacultad, setIdFacultad] = useState('');
    const [facultades, setFacultades] = useState([]);
    const [error, setError] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacultades = async () => {
        try {
            const data = await getFacultades();
            setFacultades(data);
        } catch (err) {
            console.error('Error cargando facultades', err);
        }
        };
        fetchFacultades();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await register(
            correo,
            contraseña,
            parseInt(idFacultad)
            );

            if (result && result.user) {
            navigate('/login');
            } else {
            setError('Error en registro');
            }

        } catch (err) {
            setError(err.message);
        }
    };

  return (
    <div>
        <div className="signupContainer">
            <Navbar />
            <div className="signupContent">
                <form onSubmit={handleSubmit} className="signup">
                    <img src={avatar} alt="avatar" className="avatar"/>
                    <input className="correo" 
                        placeholder="Correo"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <input className="contraseña" 
                        placeholder="Contraseña"
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                    <select className="facultades"
                        value={idFacultad}
                        onChange={(e) => setIdFacultad(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una facultad</option>
                        {facultades.map((fac) => (
                        <option key={fac.id} value={fac.id}>
                            {fac.nombre}
                        </option>
                        ))}
                    </select>

                    {error && <p className="error-message">{error}</p>}

                    <button className="ingresar" type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Signup;