import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/NavbarGestionSalas.css'; 
import logo from '../assets/images/logoUaoRojo.png';
import avatar from '../assets/images/avatar.png';
import facultad from '../assets/images/facultad.png';

function NavbarGestionSalas({ userRole }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí va tu lógica de cierre de sesión
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbarGestion">
      <div className="navbarLogoGestion">
        <Link to="/"><img src={logo} alt="logo" className="logoGestion" /></Link>
      </div>

      <div className="navbarRightGestion">
        <span className="userRole">{userRole}</span>
        <div className="avatarContainer" ref={dropdownRef}>
          <img 
            src={avatar} 
            alt="avatar" 
            className="avatarGestion" 
            onClick={toggleDropdown}
          />
          
          {isDropdownOpen && (
            <div className="dropdownMenu">
              <div className="dropdownContent">
                {/* Sección del usuario con avatar y correo juntos */}
                <div className="userInfoSection">
                  <img src={avatar} alt="avatar" className="dropdownAvatar" />
                  <div className="userEmailSection">
                    <span className="emailValue">correo@uao.edu.co</span>
                  </div>
                </div>
                
                {/* Sección de facultad */}
                <div className="dropdownFacultad">
                  <img src={facultad} alt="facultad" className="facultadIcon" />
                  <span className="facultadText">facultad</span>
                </div>
                
                {/* Botón cerrar sesión */}
                <button className="logoutButton" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarGestionSalas;