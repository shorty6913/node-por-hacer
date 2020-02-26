// Descripciones
const descripcion = {
    demand: true, // Obligatorio
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}
const completado = {
    //default: true,
    alias: 'c',
    desc: 'Marca como completado la tarea'
}


// Crea objeto con opciones
const argv = require('yargs')

// CREAR
.command('crear', 'Crear un elemento por hacer', { // Recibe un objeto que tiene la descripcion
    descripcion
})

// ACTUALZAR
.command('actualizar', 'Actualiza el estado completado por una tarea', { // Recibe 2 objetos que tienen la descripcion y completado
    descripcion,
    completado
})

// BORRAR
.command('borrar', 'Borra una tarea por hacer', {
    descripcion
})

// Listar
.command('listar', 'Lista 1 o varias tareas pro hacer', {
    completado
})


.help()
    .argv;

// Exportación
module.exports = {
    argv
}