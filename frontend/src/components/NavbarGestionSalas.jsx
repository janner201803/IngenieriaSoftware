import '../styles/NavbarGestionSalas.css'; 
import logo from '../assets/images/logoUaoRojo.png';
import avatar from '../assets/images/avatar.png';

function NavbarGestionSalas({ userRole }) {
  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="navbarRight">
        <span className="userRole">{userRole}</span>
        <img src={avatar} alt="avatar" className="avatar" />
      </div>
    </nav>
  );
}

export default NavbarGestionSalas;