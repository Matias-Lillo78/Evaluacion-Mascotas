import MascotaForm from "./MascotaForm";
import { useNavigate } from "react-router-dom"


function MascotaList({lista, onAdd, onDelete,detalle,onUpdate}) {

    const navigate = useNavigate();
    return (
        <>
            
            <MascotaForm onAdd={onAdd} />
            <h3>Lista Mascotas</h3>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <td>Nombre</td>
                            <td>Descripcion</td>
                            <td>Imagen</td>
                            <td>Estado</td>
                            <td>Tipo de animal</td>
                            <td>Edad</td>
                            <td>Raza</td>
                            <td>Sexo</td>
                            <td>Tamaño</td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lista.map(m => (
                            <tr key={m.id}>
                                <td>{m.nombre}</td>
                                <td>{m.descripcion}</td>
                                <td><img src={m.imagen} alt={m.nombre} width="80" /></td>
                                <td>{m.estado}</td>
                                <td>{m.tipo_animal}</td>
                                <td>{m.edad}</td>
                                <td>{m.raza}</td>
                                <td>{m.sexo}</td>
                                <td>{m.tamano}</td>
                                <td>
                                    <div className="btn-group btn-group-sm">
                                        <button className="btn btn-outline-primary" onClick={()=> navigate(`mascotas/${m.id}`)}>Ver Mascotas</button>
                                        <button className="btn btn-outline-warning" onClick={() => onUpdate(m.id)}>Actualizar nombre</button>
                                        <button className="btn btn-outline-danger" onClick={() => onDelete(m.id)}>Eliminar Mascota</button>
                                    </div>
                                </td>
                            </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MascotaList;
