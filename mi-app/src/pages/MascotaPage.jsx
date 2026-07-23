import MascotaForm from "../components/MascotaForm";
import MascotaList from "../components/MascotaList";
import api from "../services/api";
import { useEffect, useState } from "react";

function MascotaPage() {
    const [mascotaList, setmascotaList] = useState([])


    const fetchMascotas = async () => {
        try{
            const response = await api.get("mascotas/");
            console.log(response);
            if (response.status === 200){
                //Vamos a cargar los datos
                setmascotaList(response.data);
            }
        }catch(error){
            console.error(error.response)
        }
    }

    const addMascota = async (mascota) => {
        try {
            const response = await api.post('mascota/', mascota);
            if (response.status === 201){
                alert('Mascota agregada')
            }else{
                alert('Se produjo un error')
            }
        } catch (error) {
            console.error(error.response)
        }
    }

    useEffect(()=>{
        fetchMascotas();
    }, [])

    return (
        <article>
            <h1>Lista Mascotas</h1>
            <MascotaForm />
            <MascotaList lista={mascotaList} />
        </article>
    )
}

export default MascotaPage;
