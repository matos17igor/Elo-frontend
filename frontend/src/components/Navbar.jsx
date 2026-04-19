import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-brand">🔗 Sistema Elo</h2>
      <div className="navbar-links">
        <Link to="/">Mural Público</Link>
        <Link to="/dashboard">Painel do Voluntário</Link>
      </div>
    </nav>
  );
}

export default Navbar;
