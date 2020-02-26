// Logica de las tareas por hacer

const fs = require('fs'); // Para grabar

// Se crea arreglo vacío para mantener lista de notas
let listadoPorHacer = [];

// Función guarda en archivo JSON
const guardarDb = () => { // No recibe parametros porque va a trabajar con el arreglo

    let data = JSON.stringify(listadoPorHacer); // Convierte un objeto a formato JSON

    // Graba archivo        fs.write Funciona con CALLBACK
    fs.writeFile('./db/data.json', data, (err) => { // PATH - DATA a grabar - control de error 
        if (err) throw new Error('No se pudo grabar', err);
    });
    // OBS : Se sobreescribe la misma línea al repertirlo

}

// Función carga desde archivo JSON
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json'); // Lee archivo desde el JSON
    } catch {
        listadoPorHacer = []; // Entrega arreglo vacío cuando el JSOn esta vacío
    }

}

// Función listar 
const getListado = (completado) => {

    cargarDB();

    // Si el parametro tiene valor se filtra, sino se entrega todo
    if (completado !== undefined) {
        let nuevoListado = listadoPorHacer.filter(tarea => {
            return tarea.completado == completado
        });
        listadoPorHacer = nuevoListado;
    }
    return listadoPorHacer;

}

// Actualizar estado de una tarea
const actualizar = (descripcion, completado = true) => {

    // Cargar el arreglo desde JSON
    cargarDB();

    // Buscar en el arreglo lo que coincida con la descripcion
    let index = listadoPorHacer.findIndex(tarea => { // Findindex recibe un CALLBACK, realiza ciclo interno
        return tarea.descripcion == descripcion
    });
    // Si no coincide la busqueda retorna un -1
    if (index >= 0) {
        listadoPorHacer[index].completado = completado; // actualiza con el valor de paràmetro
        guardarDb();
        return true;
    } else {
        return false;
    }

}

// Función crear  (recibe la descripción como argumento)
const crear = (descripcion) => {

    cargarDB(); // carga los datos desde archivo para hacerle un append con un nuevo registro

    // Se crea objeto
    let porHacer = {
        descripcion, // propiedades
        completado: false // propiedades
    };

    // Apendiza nuevo registro
    listadoPorHacer.push(porHacer);
    guardarDb();

    return porHacer;

}

// Borrar una tarea
const borrar = (descripcion) => {

    cargarDB(); // Carga arreglo desde JSON

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false; // No borrado
    } else {
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    }
}

// Módulo de objetos a exportar
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}