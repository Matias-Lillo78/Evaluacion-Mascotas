import { NavLink, Routes, Route } from "react-router-dom";
import ComentarioPage from "./pages/ComentarioPage";
import MascotaPage from "./pages/MascotaPage";

function App() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Mascotas</NavLink>
          </li>
          <li>
            <NavLink to="/comentarios">Comentarios</NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<MascotaPage />} />
          <Route path="/comentarios" element={<ComentarioPage />} />
        </Routes>
      </main>
    </header>
  );
}

export default App;

