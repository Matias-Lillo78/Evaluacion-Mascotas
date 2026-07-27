import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

const badgeEstado = (estado) => {
    if (estado === "en_adopcion") return "bg-success";
    if (estado === "perdida") return "bg-warning text-dark";
    return "bg-secondary";
}

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

    if (fetchError) {
        return <div className="alert alert-danger">404 - Mascota no encontrada</div>
    }

    return (
        <div className="card mx-auto shadow-sm" style={{ maxWidth: "500px" }}>
            <img src={mascota?.imagen} alt={mascota?.nombre} className="card-img-top" />               
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="card-title mb-0">{mascota?.nombre}</h2>
                        <span className={`badge ${badgeEstado(mascota?.estado)}`}>{mascota?.estado}</span>
                    </div>

                    <p className="card-text">{mascota?.descripcion}</p>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Edad:</strong> {mascota?.edad}</li>
                        <li className="list-group-item"><strong>Raza:</strong> {mascota?.raza}</li>
                        <li className="list-group-item"><strong>Tipo de animal:</strong> {mascota?.tipo_animal}</li>
                        <li className="list-group-item"><strong>Sexo:</strong> {mascota?.sexo}</li>
                        <li className="list-group-item"><strong>Tamaño:</strong> {mascota?.tamano}</li>
                    </ul>
                </div>   
        </div>
    )
}

export default MascotasDetail;
