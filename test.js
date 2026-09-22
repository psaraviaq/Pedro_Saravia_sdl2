// ============================================
// test.js - Pruebas del Laboratorio de Arrays
// ============================================
// Este archivo verifica que las tareas del laboratorio
// produzcan la salida esperada.

const { spawnSync } = require('child_process');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Verificar que index.js exista antes de ejecutar las pruebas
const indexPath = path.join(__dirname, 'index.js');
if (!fs.existsSync(indexPath)) {
    console.error('Error: No se encontró index.js en el directorio actual.');
    process.exit(1);
}

// Función auxiliar para preparar y verificar la salida
function prepararYVerificar(entradaArray, salidaArray) {
    // Preparar la salida esperada
    const salidaEsperada = salidaArray.join('\n');

    // Ejecutar index.js con el argumento de entrada
    const resultado = spawnSync('node', ['index.js', ...entradaArray], {
        encoding: 'utf8',
        cwd: __dirname
    });

    // Verificar si hubo un error al ejecutar el proceso
    if (resultado.error) {
        throw new Error(`Error al ejecutar index.js: ${resultado.error.message}`);
    }

    // Verificar si el proceso terminó con un código de error
    if (resultado.status !== 0) {
        throw new Error(`index.js terminó con código ${resultado.status}. Stderr: ${resultado.stderr}`);
    }

    // Obtener la salida real
    let salidaReal = (resultado.stdout || '').trim();
    // Windows genera CR, eliminarlo si está presente
    salidaReal = salidaReal.replace(/\r\n/g, '\n');

    // Verificar que la salida esperada esté contenida en la salida real
    assert.ok(
        salidaReal.includes(salidaEsperada),
        `Se esperaba encontrar la salida esperada en la salida real.\n\nEsperado:\n${salidaEsperada}\n\nReal:\n${salidaReal}`
    );
}

// ============================================
// PRUEBA 1: Números del 1 al 20
// ============================================
function probarTareaUno() {
    const entradaArray = ['1'];
    const salidaArray = [];
    for (let i = 1; i <= 20; i++) {
        salidaArray.push(String(i));
    }
    prepararYVerificar(entradaArray, salidaArray);
}

// ============================================
// PRUEBA 2: Números del 1 al 16 (invertidos)
// ============================================
function probarTareaDos() {
    const entradaArray = ['2'];
    const salidaArray = [];
    for (let i = 1; i <= 16; i++) {
        salidaArray.push(String(i));
    }
    prepararYVerificar(entradaArray, salidaArray);
}

// ============================================
// PRUEBA 3: Números del 1 al 12 (con el 8 insertado)
// ============================================
function probarTareaTres() {
    const entradaArray = ['3'];
    const salidaArray = [];
    for (let i = 1; i <= 12; i++) {
        salidaArray.push(String(i));
    }
    prepararYVerificar(entradaArray, salidaArray);
}

// ============================================
// PRUEBA 4: Números del 1 al 14 (con un 5 eliminado)
// ============================================
function probarTareaCuatro() {
    const entradaArray = ['4'];
    const salidaArray = [];
    for (let i = 1; i <= 14; i++) {
        salidaArray.push(String(i));
    }
    prepararYVerificar(entradaArray, salidaArray);
}

// ============================================
// PRUEBA 5: Números del 1 al 24 separados por comas
// ============================================
function probarTareaCinco() {
    const entradaArray = ['5'];
    const salidaArray = [
        '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24'
    ];
    prepararYVerificar(entradaArray, salidaArray);
}

// ============================================
// PRUEBA 6: Array fusionado ['hello', 'world']
// ============================================
function probarTareaSeis() {
    const entradaArray = ['6'];
    const salidaArray = [
        "[ 'hello', 'world' ]"
    ];
    prepararYVerificar(entradaArray, salidaArray);
}

// ============================================
// EJECUTAR TODAS LAS PRUEBAS
// ============================================

function ejecutarPruebas() {
    const pruebas = [
        { nombre: 'Tarea 1: Números del 1 al 20', func: probarTareaUno },
        { nombre: 'Tarea 2: Números del 1 al 16 (invertidos)', func: probarTareaDos },
        { nombre: 'Tarea 3: Números del 1 al 12 (con el 8 insertado)', func: probarTareaTres },
        { nombre: 'Tarea 4: Números del 1 al 14 (con un 5 eliminado)', func: probarTareaCuatro },
        { nombre: 'Tarea 5: Números del 1 al 24 separados por comas', func: probarTareaCinco },
        { nombre: 'Tarea 6: Array fusionado [hello, world]', func: probarTareaSeis }
    ];

    let aprobadas = 0;
    const total = pruebas.length;

    console.log('Ejecutando pruebas del Laboratorio de Arrays...');
    console.log('='.repeat(50));

    for (const prueba of pruebas) {
        try {
            prueba.func();
            console.log(`[OK] ${prueba.nombre}`);
            aprobadas++;
        } catch (error) {
            console.log(`[FALLO] ${prueba.nombre}`);
            console.log(`  ${error.message}`);
        }
    }

    console.log('='.repeat(50));
    console.log(`Puntaje: ${aprobadas}/${total}`);

    if (aprobadas === total) {
        console.log('¡Todas las pruebas pasaron!');
    } else {
        console.log('Algunas pruebas fallaron. Revisa tus tareas.');
        process.exit(1);
    }
}

// Ejecutar todas las pruebas
ejecutarPruebas();