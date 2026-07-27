import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

function MascotasDetail() {
    const { id } = useParams();
    console.log(id);
    const [fetchError, setFetchError] = useState(false);
    const [mascota, setMascota] = useState(null)

    const fetchMascotasDetail = async () => {
        try{ 
            const response = await api.get(`mascotas/${id}/`);
            console.log(response.data)
            setMascota(response.data)
        }catch (error){
            console.log(error)
            setFetchError(true)
        }
    }

    useEffect(() => {
        fetchMascotasDetail();
    }, [])


    return (
        <div>
            {fetchError ? (
                <p>404 - Mascota no encontrada</p>
            ) : (
                <>    
                    <h2>{mascota?.nombre}</h2>
                    <img src={mascota?.imagen} alt={mascota?.nombre} />
                    <p>{mascota?.descripcion}</p>
                    <p>Edad: {mascota?.edad}</p>
                    <p>Raza: {mascota?.raza}</p>
                </>
            )}
        </div>
    )
}

export default MascotasDetail;