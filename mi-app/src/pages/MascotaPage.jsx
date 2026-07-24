import MascotaForm from "../components/MascotaForm";
import MascotaList from "../components/MascotaList";
import api from "../services/api";
import { useEffect, useState } from "react";

function MascotaPage() {
  const [mascotaList, setmascotaList] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tipoanimal, setTipoA] = useState([]);
  const [sexo,setSexo] = useState ([]);
  const [tamano, setTamano] = useState ([]);

  const fetchMascotas = async () => {
    try {
      const response = await api.get("mascotas/");
      if (response.status === 200) {
        //Vamos a cargar los datos
        setmascotaList(response.data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const addMascota = async (mascota) => {
    try {
      const response = await api.post("mascota/", mascota);
      if (response.status === 201) {
        alert("Mascota agregada");
      } else {
        alert("Se produjo un error");
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await api.get("choices/");
      setEstados(response.data.estado);
      setTipoA(response.data.tipo_animal)
      setSexo(response.data.sexo)
      setTamano(response.data.tamano)
    } catch (error) {
      console.log(error.response);
    }
  };


  useEffect(() => {
    fetchMascotas();
    fetchEstados();
  }, []);

  return (
    <article>
      <h1>Lista Mascotas</h1>
      <MascotaForm onAdd={addMascota} choices={estados} TipoAnimal={tipoanimal} sexo={sexo} Tamano = {tamano} />
      <MascotaList lista={mascotaList} />
    </article>
  );
}

export default MascotaPage;
