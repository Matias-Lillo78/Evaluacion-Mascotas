import MascotaList from "../components/MascotaList";
import api from "../services/api";
import { useEffect, useState } from "react";

function MascotaPage() {
  const [mascotaList, setmascotaList] = useState([]);



  const actualizarMascota = async(id)=>{
  
    const dato = prompt('Ingrese Nombre nuevo')
    try {
      const response = await api.patch(`mascotas/${id}/`,{nombre: dato.trim()})
      if(response.status === 200){
        alert('nombre actualizado')
      }
    } catch (error) {
      if (error.response?.status === 400){
        alert("Error de validacion");
      }else {
        alert("Cancelando.........")
      }
      console.log(error.response)
    } finally{
      fetchMascotas();
    }

  }

  const fetchMascotas = async () => {
    try {
      const response = await api.get("mascotas/");
      if (response.status === 200) {
        //Vamos a cargar los datos
        setmascotaList(response.data);
      }
    } catch (error) {
      console.log(error.response)
    } finally {
      fetchMascotas
    }
  };

  const eliminarMascota = async(id) =>{
    try {
      const response = await api.delete(`mascotas/${id}/`)
    } catch (error) {
      console.log(error.response.data)
      ///Aqui intentamos hacer el alert pero la informacion que entrega error.response.data.detail esta en ingles, entonces lo traducimos
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
      
      <MascotaList lista={mascotaList} onAdd={addMascota} onDelete={eliminarMascota} onUpdate={actualizarMascota}/>
    </article>
  );

}
export default MascotaPage;
