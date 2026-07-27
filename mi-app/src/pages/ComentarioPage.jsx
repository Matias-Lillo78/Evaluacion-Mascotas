import { useEffect, useState } from "react";
import api from "../services/api";

function ComentarioPage() {
  const [comentarios, setComentarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  const [mascotaId, setMascotaId] = useState("");
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerComentarios();
    obtenerMascotas();
  }, []);

  function obtenerComentarios() {
    api.get("comentarios/")
      .then((respuesta) => {
        setComentarios(respuesta.data);
      })
      .catch(() => {
        alert("Error al cargar comentarios");
      });
  }

  function obtenerMascotas() {
    api.get("mascotas/")
      .then((respuesta) => {
        setMascotas(respuesta.data);
      });
  }

  function eliminarComentario(id) {
    api.delete("comentarios/" + id + "/")
      .then(() => {
        obtenerComentarios();
      });
  }

  function guardarComentario(e) {
    e.preventDefault();

    if (mascotaId === "" || autor === "" || contenido === "") {
      setMensaje("Debe completar todos los campos.");
      return;
    }

    api.post("comentarios/", {
      mascota: mascotaId,
      autor: autor,
      contenido: contenido
    })
      .then(() => {
        setMascotaId("");
        setAutor("");
        setContenido("");
        setMensaje("");
        obtenerComentarios();
      })
      .catch(() => {
        setMensaje("Error al guardar el comentario.");
      });
  }

  return (
    <>
      <h1>Comentarios</h1>

      {comentarios.length === 0 ? (
        <p>No hay comentarios.</p>
      ) : (
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <strong>{comentario.autor}</strong>: {comentario.contenido}
              <button onClick={() => eliminarComentario(comentario.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Nuevo comentario</h2>

      <form onSubmit={guardarComentario}>

        <select
          value={mascotaId}
          onChange={(e) => setMascotaId(e.target.value)}
        >
          <option value="">Seleccione una mascota</option>

          {mascotas.map((mascota) => (
            <option key={mascota.id} value={mascota.id}>
              {mascota.nombre}
            </option>
          ))}
        </select>

        <br />

        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <br />

        <input
          type="text"
          placeholder="Comentario"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <br />

        <button>Guardar</button>

      </form>

      <p>{mensaje}</p>

    </>
  );
}

export default ComentarioPage;