import Swal from "sweetalert2";
import MascotaList from "../components/MascotaList";
import api from "../services/api";
import { useEffect, useState } from "react";

function MascotaPage() {
  const [mascotaList, setmascotaList] = useState([]);



  const actualizarMascota = async(id)=>{
  
    const { value: dato } = await Swal.fire({
      title: "Ingrese nombre nuevo",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value || !value.trim()) return "El nombre no puede estar vacío";
      }
    });

    if (!dato) return;


    try {
      const response = await api.patch(`mascotas/${id}/`,{nombre: dato.trim()})
      if(response.status === 200){
        Swal.fire("Actualizado", "El nombre fue actualizado correctamente", "success");
      }
    } catch (error) {
      if (error.response?.status === 400){
        Swal.fire("Error de validación", "Revisa el nombre ingresado", "error");
      }else {
        Swal.fire("Cancelado", "No se realizó ningún cambio", "info");
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
    const result = await Swal.fire({
      title: "¿Eliminar mascota?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
    });

    if (!result.isConfirmed) return;


    try {
      const response = await api.delete(`mascotas/${id}/`)
      Swal.fire("Eliminada", "La mascota fue eliminada correctamente", "success");
      if (response.status === 200 || response.status === 204 ){
        alert('eliminado exitosamente:)')
      }
    } catch (error) {
      console.log(error.response.data)
      ///Aqui intentamos hacer el alert pero la informacion que entrega error.response.data.detail esta en ingles, entonces lo traducimos
      const data = (error.response.data.detail)
      if(data === "No Mascota matches the given query."){
        Swal.fire("Error", "No existe esta mascota", "error");
      }
    } finally{
      fetchMascotas();
    }
    
  }

  const addMascota = async (mascota) => {
    try {
      const response = await api.post("mascotas/", mascota);
      if (response.status === 201) {
        Swal.fire("Agregada", "Mascota agregada correctamente", "success");
      } else {
        Swal.fire("Error", "Se produjo un error al agregar la mascota", "error");
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
      <h1 className="mb-4">Lista Mascotas</h1>
      
      <MascotaList lista={mascotaList} onAdd={addMascota} onDelete={eliminarMascota} onUpdate={actualizarMascota}/>
    </article>
  );

}
export default MascotaPage;
