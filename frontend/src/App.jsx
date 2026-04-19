import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página Inicial - Lista Pública</h1>} />
        <Route path="/dashboard" element={<h1>Painel do Voluntário</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
