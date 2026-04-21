import { useState, useEffect } from "react";
import api from "../services/api";

function Home() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token_elo");

  useEffect(() => {
    api
      .get("/persons")
      .then((res) => setPersons(res.data))
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

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Carregando radar...</h2>;

  return (
    <div className="container">
      <h1>Mural de Buscas</h1>
      <p>Lista atualizada de pessoas desaparecidas e resgatadas.</p>
      {persons.length == 0 ? (
        <p>Não há ninguém registrado no sistema</p>
      ) : (
        <p></p>
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
              <strong>Telefone para contato:</strong> {person.telefone}
            </p>

            {person.nome_abrigo && (
              <p className="card-location">
                📍 Localizado em: {person.nome_abrigo}
              </p>
            )}

            {token && (
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(person.id)}
              >
                🗑️ Apagar Registro
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
