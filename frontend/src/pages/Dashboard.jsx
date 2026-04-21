import { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {
  const [formData, setFormData] = useState({
    nome_completo: "",
    idade: "",
    caracteristicas: "",
    ultimo_local: "",
    telefone: "",
    location_id: "",
  });

  const [locations, setLocations] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    api.get("/locations").then((res) => setLocations(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pacote = {
        ...formData,
        status: formData.location_id ? "RESGATADO" : "DESAPARECIDO",
      };
      await api.post("/persons", pacote);
      setMensagem("✅ Sucesso!");
      setFormData({
        nome_completo: "",
        idade: "",
        caracteristicas: "",
        ultimo_local: "",
        telefone: "",
        location_id: "",
      });
    } catch (error) {
      setMensagem("❌ Erro ao salvar.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Painel do Voluntário</h1>
        <p>Cadastre um novo alerta de pessoa desaparecida.</p>

        {mensagem && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "#e6ffe6",
              borderRadius: "5px",
            }}
          >
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo: *</label>
            <input
              type="text"
              name="nome_completo"
              className="form-control"
              value={formData.nome_completo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Idade:</label>
            <input
              type="number"
              name="idade"
              className="form-control"
              value={formData.idade}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Características Físicas:</label>
            <textarea
              name="caracteristicas"
              className="form-control"
              value={formData.caracteristicas}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Último local visto:</label>
            <input
              type="text"
              name="ultimo_local"
              className="form-control"
              value={formData.ultimo_local}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Telefone de Contato:</label>
            <input
              type="text"
              name="telefone"
              className="form-control"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Localização / Abrigo (se já resgatado):</label>
            <select
              name="location_id"
              className="form-control"
              value={formData.location_id}
              onChange={handleChange}
            >
              <option value="">Ainda não localizado (Desaparecido)</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Registrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
