const tColores = {
  Rojo: 0,
  Verde: 1,
  Azul: 2,
  Dorado: 3,
  Blanco: 4,
  Marron: 5,
  Naranja: 6
};

const tModo = {
  Facil: 0,
  Dificil: 1
};

// Número de colores disponibles
const NUM_COLORES_FACIL = 4;
const NUM_COLORES_DIFICIL = 7;

// Número máximo de secuencias
const MAX_SECUENCIAS_FACIL = 12;
const MAX_SECUENCIAS_DIFICIL = 15;

const MAX_COLORES_SEQ = 20;


// --- FUNCIÓN DE JONATHAN (NO TOCAR) ---
function llamada() {
  const readline = require("readline");

  function pregunta(rl, texto) {
    return new Promise((resolve) => {
      rl.question(texto, resolve);
    });
  }

  async function main() {
    process.stdin.resume();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("¡Bienvenido a Simon dice!");
    const nombre = await pregunta(rl, "¿Cuál es tu nombre? ");
    console.log(`Hola ${nombre}, pulsa una tecla para empezar a jugar.`);

    console.log("Elija una opción para continuar:");
    console.log("0: Salir.");
    console.log("1: Jugar en modo sencillo.");
    console.log("2: Jugar en modo difícil.");

    let opcion = await pregunta(rl, "Opción: ");

    if (opcion == "0") {
      console.log("Saliendo del programa...");

    } else if (opcion == "1") {
      await comenzarJuego(nombre, rl, tModo.Facil, 3);

    } else if (opcion == "2") {
      await comenzarJuego(nombre, rl, tModo.Dificil, 3);

    } else {
      console.log("Opción no válida.");

    }
    rl.close();
  }

  main().catch(console.error);
}

function charToColor(color) {
  switch (color.toLowerCase()) {
    case "r": 
      return tColores.Rojo;
    case "v": 
      return tColores.Verde;
    case "a": 
      return tColores.Azul;
    case "d": 
      return tColores.Dorado;
    case "b":
      return tColores.Blanco
    case "m":
      return tColores.Marron
    case "n":
      return tColores.Naranja
    default: 
      return null;
  }
}

function intToColor(numero) {
  switch (numero) {
    case 0: 
      return tColores.Rojo;
    case 1: 
      return tColores.Verde;
    case 2: 
      return tColores.Azul;
    case 3: 
      return tColores.Dorado;
    case 4: 
      return tColores.Blanco;
    case 5: 
      return tColores.Marron;
    case 6: 
      return tColores.Naranja;
    default: 
      return null;
  }
}

function mostrarColor(color) {
  switch (color) {
    case tColores.Rojo: 
      return "Rojo";
    case tColores.Verde: 
      return "Verde";
    case tColores.Azul: 
      return "Azul";
    case tColores.Dorado: 
      return "Dorado";
    case tColores.Blanco: 
      return "Blanco";
    case tColores.Marron: 
      return "Marron";
    case tColores.Naranja: 
      return "Naranja";
    default: 
      return "";
  }
}

//modo para generar secuencia segun el modo de juego
function generarSecuencia(numColores, modo) {
  let secuencia = [];
  let tamaño;
  if (modo == tModo.Facil) {
    tamaño = MAX_SECUENCIAS_FACIL;
  } else {
    tamaño = MAX_SECUENCIAS_DIFICIL;
  }
  for (let i = 0; i < tamaño; i++) {
    let rand = Math.floor(Math.random() * numColores);
    secuencia.push(intToColor(rand));
  }
  return secuencia;
}

function comprobarColor(secuenciaColores, indice, color) {
  return secuenciaColores[indice] === color;
}

function mostrarSecuencia(secuenciaColores, numero) {
  let guia = "";
  for (let i = 0; i < numero; i++) {
    guia += mostrarColor(secuenciaColores[i]);
    if (i != numero - 1) {
      guia += " - ";
    }
  }
  console.log(`Secuencia numero ${numero - 2}: ${guia}`);
  console.log("Memoriza la secuencia y pulsa Enter para continuar...");
}

function utilizarAyuda(secuenciaColores, indice, numAyudas){
  if (numAyudas > 0) {
    console.log(`El color es el ${mostrarColor(secuenciaColores[indice])}. Te quedan ${numAyudas - 1} ayudas`);
    return numAyudas - 1;
  } else {
    console.log("No te quedan mas ayudas");
    return numAyudas;
  }
}

//modo para generar secuencia segun el modo de juego
async function comenzarJuego(nombre, rl, modo, numAyudas) {
  let numColores;
  let maxSecuencias;
  if (modo == tModo.Facil) {
    numColores = NUM_COLORES_FACIL;
    maxSecuencias = MAX_SECUENCIAS_FACIL;
  } else {
    numColores = NUM_COLORES_DIFICIL;
    maxSecuencias = MAX_SECUENCIAS_DIFICIL;
  }

  let secuencia = generarSecuencia(3);
  let longitudActual = 3;
  let juegoTerminado = false;

  const leer = (texto) => new Promise((resolve) => rl.question(texto, resolve));

  console.log("Empieza el juego, " + nombre);

  // PRIMER WHILE: Comprueba que no ha terminado y la longitud es <= 12
  while (!juegoTerminado && longitudActual <= maxSecuencias) {
    
    mostrarSecuencia(secuencia, longitudActual);

    await leer("");
    console.clear();
    console.log(`Ayudas disponibles: ${numAyudas}`);
    console.log(`${nombre}, introduce la secuencia de ${longitudActual} colores:`);

    if (modo == tModo.Facil) {
      console.log("(R = Rojo, V = Verde, A = Azul, D = Dorado, x = Ayuda)");
    } else  if (tModo.Dificil){
      console.log("(R = Rojo, V = Verde, A = Azul, D = Dorado, B = Blanco, M = Marron, N = Naranja, x = Ayuda)");
    }

    let i = 0;

    // SEGUNDO WHILE: Termina cuando fallas o aciertas todos los colores
    while (!juegoTerminado && i < longitudActual) {
      
      let respuesta = await leer(`Color ${i + 1}: `);

      // AYUDAS
      if (respuesta.toLowerCase() == "x") {
        numAyudas = utilizarAyuda(secuencia, i, numAyudas);
        continue;
      }

      let colorUsuario = charToColor(respuesta);

      if (colorUsuario === null) {
        console.log("Color no válido. Introduce R, V, A o D.");
        continue; 
      }

      if (comprobarColor(secuencia, i, colorUsuario)) {
        i++;
      } else {
        juegoTerminado = true;
        console.clear(); 
      }
    }

    // comprobamos pq ha salido del while
    if (!juegoTerminado) {
      console.log(`Enhorabuena, has acertado la secuencia numero ${longitudActual - 2}.\n`);
      longitudActual++;
    } else {
      console.log("Has fallado la secuencia.");
    }
  }

  // Condición de victoria
  if (longitudActual > maxSecuencias) {
    console.log("¡¡¡Has ganado!!!");
  }
}

// EJECUTAMOS EL PROGRAMA
llamada();