import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token_elo");
  const nomeUsuario = localStorage.getItem("usuario_nome");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">🔗 Sistema Elo</h2>

      <div
        className="navbar-links"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/">Mural Público</Link>

        {token && <Link to="/dashboard">Painel do Voluntário</Link>}

        {token ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginLeft: "20px",
            }}
          >
            <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>
              Olá, {nomeUsuario.split(" ")[0]}
            </span>
            <button className="btn-logout" onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ marginLeft: "20px", fontWeight: "bold" }}>
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
