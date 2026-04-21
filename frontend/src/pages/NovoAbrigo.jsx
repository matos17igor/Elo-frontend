import { useState } from "react";
import api from "../services/api";

function NovoAbrigo() {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    capacidade: "",
    contato: "",
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("Salvando...");

    try {
      await api.post("/locations", formData);
      setMensagem("✅ Abrigo cadastrado com sucesso!");
      setFormData({ nome: "", endereco: "", capacidade: "", contato: "" }); // Limpa o formulário
    } catch (error) {
      console.error("Erro ao cadastrar abrigo:", error);
      setMensagem("❌ Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Cadastrar Novo Abrigo</h1>
        <p>Adicione um novo local de acolhimento para a rede.</p>

        {mensagem && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              backgroundColor: mensagem.includes("✅") ? "#e6ffe6" : "#ffe6e6",
              color: mensagem.includes("✅") ? "#2e7d32" : "#dc3545",
            }}
          >
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Abrigo / Local: *</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Ginásio Municipal"
            />
          </div>

          <div className="form-group">
            <label>Endereço Completo: *</label>
            <input
              type="text"
              name="endereco"
              className="form-control"
              value={formData.endereco}
              onChange={handleChange}
              required
              placeholder="Rua, Número, Bairro"
            />
          </div>

          <div className="form-group">
            <label>Capacidade (Número de pessoas):</label>
            <input
              type="number"
              name="capacidade"
              className="form-control"
              value={formData.capacidade}
              onChange={handleChange}
              placeholder="Ex: 500"
            />
          </div>

          <div className="form-group">
            <label>Telefone / Contato do Local:</label>
            <input
              type="text"
              name="contato"
              className="form-control"
              value={formData.contato}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Salvar Abrigo
          </button>
        </form>
      </div>
    </div>
  );
}

export default NovoAbrigo;
