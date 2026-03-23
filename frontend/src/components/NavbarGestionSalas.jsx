import { Link } from "react-router-dom";
import '../styles/NavbarGestionSalas.css'; 
import logo from '../assets/images/logoUaoRojo.png';
import avatar from '../assets/images/avatar.png';

function NavbarGestionSalas({ userRole }) {
  return (
    <nav className="navbarGestion">
      <div className="navbarLogoGestion">
        <Link to="/"><img src={logo} alt="logo" className="logoGestion" /></Link>
      </div>

      <div className="navbarRightGestion">
        <span className="userRole">{userRole}</span>
        <img src={avatar} alt="avatar" className="avatarGestion" />
      </div>
    </nav>
  );
}

export default NavbarGestionSalas;