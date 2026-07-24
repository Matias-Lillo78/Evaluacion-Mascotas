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
}

}

  export default ComentarioPage