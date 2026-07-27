import MascotaForm from "./MascotaForm";
import { useNavigate } from "react-router-dom"


function MascotaList({lista, onAdd, onDelete,detalle}) {

    const navigate = useNavigate();
    return (
        <>
            <h3>Lista Mascotas</h3>
            <MascotaForm onAdd={onAdd} />
            <table>
                <thead>
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
                        lista.map(m => (<tr key={m.id}><td>{m.nombre}</td><td>{m.descripcion}</td><td><img src={m.imagen} alt={m.nombre} width="80" /></td><td>{m.estado}</td><td>{m.tipo_animal}</td><td>{m.edad}</td><td>{m.raza}</td><td>{m.sexo}</td><td>{m.tamano}</td><td><button onClick={()=> navigate(`mascotas/${m.id}`)}>Ver Mascotas</button></td><td><button onClick={() => onDelete(m.id)}>Eliminar</button></td></tr>))
                    }
                </tbody>
            </table>
        </>
    )
}

export default MascotaList;
