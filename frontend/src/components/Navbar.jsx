import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        uao
      </div>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>

    </nav>
  );
}

export default Navbar;