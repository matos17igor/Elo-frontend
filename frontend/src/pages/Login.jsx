import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await api.post("/login", { email, senha });

      localStorage.setItem("token_elo", response.data.token);
      localStorage.setItem("usuario_nome", response.data.usuario.nome);
      localStorage.setItem("usuario_id", response.data.usuario.id); // Útil para o cadastro depois!

      navigate("/dashboard");
    } catch (error) {
      console.error("Falha no login:", error);
      setErro(
        error.response?.data?.error || "Erro ao conectar com o servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <div className="card">
        <h2 className="card-title" style={{ textAlign: "center" }}>
          Acesso Restrito
        </h2>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Exclusivo para voluntários cadastrados.
        </p>

        {erro && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "#ffe6e6",
              color: "#dc3545",
              borderRadius: "5px",
              textAlign: "center",
              border: "1px solid #dc3545",
            }}
          >
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>E-mail do Voluntário:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? "Autenticando..." : "Entrar no Sistema"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
