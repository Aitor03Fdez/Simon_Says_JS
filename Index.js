const tColores = {
  Rojo: 0,
  Verde: 1,
  Azul: 2,
  Dorado: 3,
};
let MAX_COLORES_SEQ = 12;

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

    await pregunta(rl, "");
    await comenzarJuego(nombre, rl);

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
    default: 
      return "";
  }
}

function generarSecuencia(numColores) {
  let secuencia = [];
  for (let i = 0; i < MAX_COLORES_SEQ; i++) {
    let rand = Math.floor(Math.random() * (numColores + 1));
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
    guia += mostrarColor(secuenciaColores[i]) + (i === numero - 1 ? "" : " - ");
  }
  console.log(`Secuencia numero ${numero - 2}: ${guia}`);
  console.log("Memoriza la secuencia y pulsa Enter para continuar...");
}


async function comenzarJuego(nombre, rl) {

  let secuencia = generarSecuencia(3);
  let longitudActual = 3;
  let juegoTerminado = false;

  const leer = (texto) => new Promise((resolve) => rl.question(texto, resolve));

  console.log("Empieza el juego, " + nombre);

  // PRIMER WHILE: Comprueba que no ha terminado y la longitud es <= 12
  while (!juegoTerminado && longitudActual <= MAX_COLORES_SEQ) {
    
    mostrarSecuencia(secuencia, longitudActual);

    await leer("");
    console.clear();

    console.log(`${nombre}, introduce la secuencia de ${longitudActual} colores:`);
    console.log("(R = Rojo, V = Verde, A = Azul, D = Dorado)");

    let i = 0;

    // SEGUNDO WHILE: Termina cuando fallas o aciertas todos los colores
    while (!juegoTerminado && i < longitudActual) {
      
      let respuesta = await leer(`Color ${i + 1}: `);
      
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
  if (longitudActual > MAX_COLORES_SEQ) {
    console.log("¡¡¡Has ganado!!!");
  }
}

// EJECUTAMOS EL PROGRAMA
llamada();