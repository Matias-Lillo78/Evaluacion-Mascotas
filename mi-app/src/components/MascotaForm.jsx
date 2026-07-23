import { useState } from "react";

function MascotaForm(onAdd){
    const [nombre, setnombre] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [Imagen, setImagen] = useState("");
    const [Estado, setEstado] = useState("");
    const [TipoDeAnimal, setTipoDeAnimal] = useState("");
    const [Edad, setEdad] = useState("");
    const [Raza, setRaza] = useState("");
    const [Sexo, setSexo] = useState("");
    const [Tamaño, setTamaño] = useState("");
    const [errores, setErrores] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hice click")

        if(nombre.trim() === ""){
            setErrores("Nombres no puede estar vacio")
            return
        }
        if(descripcion.trim() === ""){
            setErrores("Descripcion no puede estar vacio")
            return
        }
        if(Imagen.trim() === ""){
            setErrores("Imagen no puede estar vacio")
            return
        }
        if(Estado.trim() === ""){
            setErrores("Estado no puede estar vacio")
            return
        }
        if(TipoDeAnimal.trim() === ""){
            setErrores("Tipo de animal no puede estar vacio")
            return
        }
        if(Edad.trim() === ""){
            setErrores("Edad no puede estar vacio")
            return
        }
        if(Raza.trim() === ""){
            setErrores("Raza no puede estar vacio")
            return
        }
        if(Sexo.trim() === ""){
            setErrores("Sexo no puede estar vacio")
            return
        }
        if(Tamaño.trim() === ""){
            setErrores("Tamaño no puede estar vacio")
            return
        }


        const mascota = {
            nombre = nombre,
            descripcion = descripcion,
            imagen = Imagen,
            estado = Estado,
            tipo_animal = TipoDeAnimal,
            edad = Edad,
            raza = Raza,
            sexo = Sexo,
            tamaño =Tamaño
        }

        onAdd(mascota)
        setnombre("")
        setdescripcion("")
        setImagen("")
        setEstado("")
        setTipoDeAnimal("")
        setEdad("")
        setRaza("")
        setSexo("")
        setTamaño("")

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
                <p>{errores}</p>

            </form>
        
        </>

    )
}

export default MascotaForm;