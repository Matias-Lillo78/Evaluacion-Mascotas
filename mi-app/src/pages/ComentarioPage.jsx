import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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

  useEffect(() => {
    if (mensaje === "") return;

    const timer = setTimeout(() => {
      setMensaje("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [mensaje]);

  function obtenerComentarios() {
    api.get("comentarios/")
      .then((respuesta) => {
        setComentarios(respuesta.data);
      })
      .catch(() => {
        Swal.fire("Error", "No se pudieron cargar los comentarios", "error");
      });
  }

  function obtenerMascotas() {
    api.get("mascotas/")
      .then((respuesta) => {
        setMascotas(respuesta.data);
      });
  }

  async function eliminarComentario(id) {
    const result = await Swal.fire({
      title: "¿Eliminar comentario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
    });

    if (!result.isConfirmed) return;

    api.delete("comentarios/" + id + "/")
      .then(() => {
        obtenerComentarios();
        Swal.fire("Eliminado", "El comentario fue eliminado", "success");
      })
      .catch(() => {
        Swal.fire("Error", "No se pudo eliminar el comentario", "error");
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
        Swal.fire("Guardado", "Comentario agregado correctamente", "success");
      })
      .catch(() => {
        setMensaje("Error al guardar el comentario.");
      });
  }

  return (
    <>
      <h1 className="mb-4">Comentarios</h1>

      {comentarios.length === 0 ? (
        <p>No hay comentarios.</p>
      ) : (
        <ul className="list-group mb-4">
          {comentarios.map((comentario) => (
            <li key={comentario.id} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <strong>{comentario.autor}</strong>: {comentario.contenido}
              </div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarComentario(comentario.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="card">
        <div className="card-body">
          <h2 className="card-title h5">Nuevo comentario</h2>
          <form onSubmit={guardarComentario} className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
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
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Comentario"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              />
            </div>

            <div className="col-12">
              <button className="btn btn-primary">Guardar</button>
              {mensaje && <p className="text-danger mt-2 mb-0">{mensaje}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ComentarioPage;