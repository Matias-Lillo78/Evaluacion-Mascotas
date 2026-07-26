import MascotaList from "../components/MascotaList";
import api from "../services/api";
import { useEffect, useState } from "react";

function MascotaPage() {
  const [mascotaList, setmascotaList] = useState([]);


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

  const eliminarMascota = async(id) =>{
    try {
      const response = await api.delete(`mascotas/${id}/`)
      fetchMascotas();
      
    } catch (error) {
      console.error(response.error)
    }
    
  }

  const addMascota = async (mascota) => {
    try {
      const response = await api.post("mascotas/", mascota);
      if (response.status === 201) {
        alert("Mascota agregada");
      } else {
        alert("Se produjo un error");
      }
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      fetchMascotas();
    }
  };




  useEffect(() => {
    fetchMascotas();
  }, []);

  return (
    <article>
      <h1>Lista Mascotas</h1>
      
      <MascotaList lista={mascotaList} onAdd={addMascota} onDelete={eliminarMascota}/>
    </article>
  );
}

export default MascotaPage;

