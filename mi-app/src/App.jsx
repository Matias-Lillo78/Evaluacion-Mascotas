import { NavLink, Routes, Route } from "react-router-dom";
import ComentarioPage from "./pages/ComentarioPage";
import MascotaPage from "./pages/MascotaPage";
import MascotasDetail from "./components/MascotasDetail";

function App() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand">Mascotas</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>Mascotas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/comentarios" >Comentarios</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<MascotaPage />} />
          <Route path="/comentarios" element={<ComentarioPage />} />
          <Route path="mascotas/:id" element={<MascotasDetail />} />
        </Routes>
      </main>
    </header>
  );
}

export default App;

