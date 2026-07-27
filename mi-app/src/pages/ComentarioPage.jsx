import { useEffect, useState } from "react";
import api from "../services/api";

function ComentarioPage() {
  const [comentarios, setComentarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [mascotaId, setMascotaId] = useState("");
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const [enviando, setEnviando] = useState(false);

  function cargarComentarios() {
    api.get("comentarios/")
      .then((res) => {
        setComentarios(res.data);
      })
      .catch(() => {
        setError("No se pudieron cargar los comentarios.");
      })
      .finally(() => {
        setCargando(false);
      });
  }
  useEffect(() => {
    cargarComentarios();
    // lista de mascotas para poblar comentarios
    api.get("mascotas/").then((res) => setMascotas(res.data));
  }, []);

  function handleEliminar(id) {
    api.delete(`comentarios/${id}/`)
      .then(() => {
        cargarComentarios();
      });
  }
 function handleSubmit(e) {
    e.preventDefault();

    if (mascotaId === "") {
      setErrorForm("Debes elegir una mascota");
      return;
    }
    if (autor.trim() === "") {
      setErrorForm("Autor no puede estar vacio");
      return;
    }
    if (contenido.trim() === "") {
      setErrorForm("Contenido no puede estar vacio");
      return;
    }
    setErrorForm("");
    setEnviando(true);

    api.post("comentarios/", {
      mascota: Number(mascotaId),
      autor,
      contenido,
    })
      .then(() => {
        setMascotaId("");
        setAutor("");
        setContenido("");
        cargarComentarios();
      })
      .catch((err) => {
        setErrorForm(JSON.stringify(err.response?.data));
      })
      .finally(() => {
        setEnviando(false);
      });
  }

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Comentarios</h1>

      {comentarios.length === 0 ? (
        <p>No hay comentarios todavia.</p>
      ) : (
        <ul>
          {comentarios.map((c) => (
            <li key={c.id}>
              <strong>{c.autor}: </strong>{c.contenido}
              <button onClick={() => handleEliminar(c.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
          )}

    <h3>Agregar comentario</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Mascota
          <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)}>
            <option value="">Selecciona una mascota</option>
            {mascotas.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </label>
        <label>Autor<input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} /></label>
        <label>Comentario<input type="text" value={contenido} onChange={(e) => setContenido(e.target.value)} /></label>
        <button disabled={enviando}>{enviando ? "Enviando..." : "Comentar"}</button>
        <p>{errorForm}</p>
      </form>
    </>
  );

}
export default ComentarioPage;