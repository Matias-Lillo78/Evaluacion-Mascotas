import { useEffect, useState } from "react";
import api from "../services/api";

function MascotaForm({ onAdd }) {
    const [Estado, setEstado] = useState([]);
    const [TipoDeAnimal, setTipoDeAnimal] = useState([]);
    const [Sexo, setSexo] = useState([]);
    const [Tamaño, setTamaño] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [Edad, setEdad] = useState("");
    const [Raza, setRaza] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");
    const [selectedTipoDeAnimal, setSelectedTipoDeAnimal] = useState("");
    const [selectedSexo, setSelectedSexo] = useState("");
    const [selectedTamaño, setSelectedTamaño] = useState("");
    const [Imagen, setImagen] = useState(null);

    const [errores, setErrores] = useState("")

    const fetchChoices = async () => {
        try{
            const response = await api.get("choices/");
            console.log(response.data.estado);
            setEstado(response.data.estado);
            setTipoDeAnimal(response.data.tipo_animal)
            setSexo(response.data.sexo)
            setTamaño(response.data.tamano)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchChoices();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(nombre, descripcion, Edad, Raza, selectedEstado, selectedTipoDeAnimal, selectedSexo, selectedTamaño, Imagen)
        

        if(nombre.trim() === ""){
            setErrores("Nombres no puede estar vacio")
            return
        }
        if(descripcion.trim() === ""){
            setErrores("Descripcion no puede estar vacio")
            return
        }
        if(!Imagen){
            setErrores("Imagen no puede estar vacio")
            return
        }
        if(selectedEstado === ""){
            setErrores("Estado no puede estar vacio")
            return
        }
        if(selectedTipoDeAnimal === ""){
            setErrores("Tipo de animal no puede estar vacio")
            return
        }
        if(Edad === "" || isNaN(Edad)){
            setErrores("Edad no puede estar vacio")
            return
        }
        if(Raza.trim() === ""){
            setErrores("Raza no puede estar vacio")
            return
        }
        if(selectedSexo === ""){
            setErrores("Sexo no puede estar vacio")
            return
        }
        if(selectedTamaño === ""){
            setErrores("Tamaño no puede estar vacio")
            return
        }

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("edad", Edad);
        formData.append("raza", Raza);
        formData.append("estado", selectedEstado);
        formData.append("tipo_animal", selectedTipoDeAnimal);
        formData.append("sexo", selectedSexo);
        formData.append("tamano", selectedTamaño);
        formData.append("imagen", Imagen);

        console.log(formData);
        onAdd(formData);
    }

    return(
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h3 className="card-title mb-3">Formulario Mascotas</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="row g-3">

                <div className="col-md-4">
                    <label className="form-label">Nombre: <input type="text" className="form-control" onChange={e=> setNombre(e.target.value)}/></label>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Descripcion: <input type="text" className="form-control" onChange={e=> setDescripcion(e.target.value)}/></label>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Imagen: <input type="file" className="form-control" onChange={e => setImagen(e.target.files[0])} /></label>
                </div>
                    
                <div className="col-md-3">
                    <label className="form-label">Estado: 
                        <select className="form-select" value={selectedEstado} onChange={e => setSelectedEstado(e.target.value)} >
                            <option value={""} disabled>Sin estado</option>
                            {
                                Estado.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                            }
                        </select>
                    </label>
                </div>    

                <div className="col-md-3">
                    <label className="form-label">Tipo Animal: 
                        <select className="form-select" value={selectedTipoDeAnimal} onChange={e => setSelectedTipoDeAnimal(e.target.value)}>
                            <option value={""} disabled>...</option>
                            {
                                TipoDeAnimal.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                            }
                        </select>
                    </label>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Edad: <input type="number" className="form-control" onChange={e=> setEdad(e.target.value)}/></label>
                </div>
                
                 <div className="col-md-3">
                    <label className="form-label">Raza: <input type="text" className="form-control" onChange={e=> setRaza(e.target.value)}/></label>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Sexo: 
                        <select className="form-select" value={selectedSexo} onChange={e => setSelectedSexo(e.target.value)}>
                            <option value={""} disabled>...</option>
                            {
                                Sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                            }
                        </select>
                    </label>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Tamaño: 
                        <select className="form-select" value={selectedTamaño} onChange={e => setSelectedTamaño(e.target.value)}>
                            <option value={""} disabled>...</option>
                            {
                                Tamaño.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                            }
                        </select>
                    </label>
                </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Agregar: </button>
                        <p className="text-danger mt-2 mb-0">{errores}</p>
                    </div>

                </form>
            </div>
        </div>
        
     

    )
}

export default MascotaForm;