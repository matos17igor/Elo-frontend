import { useState, useEffect } from "react";
import api from "../services/api";

function Home() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);
  const [stats, setStats] = useState({
    missing: 0,
    rescued: 0,
    totalLocations: 0,
  });

  const token = localStorage.getItem("token_elo");

  const carregarDados = () => {
    Promise.all([api.get("/persons"), api.get("/stats"), api.get("/locations")])
      .then(([resPersons, resStats, resLoc]) => {
        setPersons(resPersons.data);
        setStats(resStats.data);
        setLocations(resLoc.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    Promise.all([api.get("/persons"), api.get("/stats")])
      .then(([resPersons, resStats]) => {
        setPersons(resPersons.data);
        setStats(resStats.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar este registro?")) {
      try {
        await api.delete(`/persons/${id}`);
        setPersons(persons.filter((person) => person.id !== id));
      } catch (error) {
        console.error("Erro ao apagar:", error);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/persons/${editingPerson.id}`, editingPerson);
      setEditingPerson(null);
      carregarDados();
    } catch (error) {
      console.error("Erro ao editar:", error);
      alert("Erro ao atualizar os dados.");
    }
  };

  const handleModalChange = (e) => {
    setEditingPerson({ ...editingPerson, [e.target.name]: e.target.value });
  };

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Carregando radar...</h2>;

  return (
    <div className="container">
      <h1>Mural de Buscas</h1>
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          fontSize: "0.9rem",
          color: "#666",
        }}
      >
        <span>
          🔴 <strong>{stats.missing}</strong> Desaparecidos
        </span>
        <span>
          🟢 <strong>{stats.rescued}</strong> Resgatados
        </span>
        <span>
          🏠 <strong>{stats.totalLocations}</strong> Abrigos Ativos
        </span>
      </div>
      {persons.length == 0 ? (
        <p>Não há ninguém registrado no sistema</p>
      ) : (
        <p>Lista atualizada de pessoas desaparecidas e resgatadas.</p>
      )}
      <div className="card-list">
        {persons.map((person) => (
          <div
            key={person.id}
            className={`card status-${person.status.toLowerCase()}`}
          >
            <h2 className="card-title">{person.nome_completo}</h2>
            <p className="card-info">
              <strong>Status:</strong> {person.status}
            </p>
            <p className="card-info">
              <strong>Idade:</strong> {person.idade} anos
            </p>
            <p className="card-info">
              <strong>Último local:</strong> {person.ultimo_local}
            </p>
            <p className="card-info">
              <strong>Características:</strong> {person.caracteristicas}
            </p>
            <p className="card-info">
              <strong>Contato:</strong> {person.telefone}
            </p>

            {person.nome_abrigo && (
              <p className="card-location">
                📍 Localizado em: {person.nome_abrigo}
              </p>
            )}

            {token && (
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setEditingPerson(person)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(person.id)}
                >
                  🗑️ Apagar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {editingPerson && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Editar Registro</h2>
              <button
                className="btn-close"
                onClick={() => setEditingPerson(null)}
              >
                ✖
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Nome Completo:</label>
                <input
                  type="text"
                  name="nome_completo"
                  className="form-control"
                  value={editingPerson.nome_completo}
                  onChange={handleModalChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  className="form-control"
                  value={editingPerson.status}
                  onChange={handleModalChange}
                >
                  <option value="DESAPARECIDO">DESAPARECIDO</option>
                  <option value="RESGATADO">RESGATADO</option>
                </select>
              </div>

              {editingPerson.status === "RESGATADO" && (
                <div className="form-group">
                  <label>Encaminhado para o Abrigo:</label>
                  <select
                    name="location_id"
                    className="form-control"
                    value={editingPerson.location_id || ""}
                    onChange={handleModalChange}
                  >
                    <option value="">Selecione o Abrigo...</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ flex: 1, backgroundColor: "#6c757d" }}
                  onClick={() => setEditingPerson(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
