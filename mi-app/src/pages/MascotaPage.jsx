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
      
    }
  };

  const eliminarMascota = async(id) =>{
    try {
      const response = await api.delete(`mascotas/${id}/`)
    } catch (error) {
      console.log(error.response.data)
      ///Aqui intentamos hacer el alert pero la informacion que entrega error.response.data.detail esta en ingles, entonces lo traduciremos
      const data = (error.response.data.detail)
      if(data === "No Mascota matches the given query."){
        alert('No existe esta mascota')
      }
    } finally{
      fetchMascotas();
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

