function MascotaForm(){

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hice click")
    }

    return(
        <>
                <h3>Formulario Mascotas</h3>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Nombre<input type="text"/></label>
                <label>Descripcion<input type="text"/></label>
                <label>Imagen<input type="text"/></label>
                <label>Estado<input type="text"/></label>
                <label>TipodeAnimal<input type="text"/></label>
                <label>Edad<input type="text"/></label>
                <label>Raza<input type="text"/></label>
                <label>Sexo<input type="text"/></label>
                <label>Tamaño<input type="text"/></label>
                <button>Agregar</button>
                <p></p>

            </form>
        
        </>

    )
}

export default MascotaForm;