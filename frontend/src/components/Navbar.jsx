import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo-elo.png"; //

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
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logoImg}
          alt="Logo do Sistema Elo"
          style={{ height: "70px", objectFit: "contain" }}
        />
      </Link>

      <div
        className="navbar-links"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/">Mural Público</Link>

        {token && (
          <>
            <Link to="/dashboard">Painel de Buscas</Link>
            <Link to="/novo-abrigo">Cadastrar Abrigo</Link>
          </>
        )}

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
