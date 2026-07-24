function MascotaForm(){
    const [nombre, setnombre] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [Imagen, setImagen] = useState("");
    const [Estado, setEstado] = useState("");
    const [TipoDeAnimal, setTipoDeAnimal] = useState("");
    const [Edad, setEdad] = useState("");
    const [Raza, setRaza] = useState("");
    const [Sexo, setSexo] = useState("");
    const [Tamaño, setTamaño] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hice click")


        
    }

    return(
        <>
                <h3>Formulario Mascotas</h3>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Nombre<input type="text" onChange={e=> setnombre(e.target.value)}/></label>
                <label>Descripcion<input type="text"onChange={e=> setdescripcion(e.target.value)}/></label>
                <label>Imagen<input type="text"onChange={e=> setImagen(e.target.value)}/></label>
                <label>Estado<input type="text"onChange={e=> setEstado(e.target.value)}/></label>
                <label>TipodeAnimal<input type="text"onChange={e=> setTipoDeAnimal(e.target.value)}/></label>
                <label>Edad<input type="text"onChange={e=> setEdad(e.target.value)}/></label>
                <label>Raza<input type="text"onChange={e=> setRaza(e.target.value)}/></label>
                <label>Sexo<input type="text"onChange={e=> setSexo(e.target.value)}/></label>
                <label>Tamaño<input type="text"onChange={e=> setTamaño(e.target.value)}/></label>
                <button>Agregar</button>
                <p></p>

            </form>
        
        </>

    )
}

export default MascotaForm;