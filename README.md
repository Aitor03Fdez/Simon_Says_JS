# 🎮 Simon Dice — Proyecto de Programación

> Implementación del clásico juego *Simon Dice* en consola utilizando JavaScript y Node.js.

---

## 📌 Descripción

Este proyecto consiste en el desarrollo del juego **Simon Dice**, donde el jugador debe memorizar y repetir una secuencia de colores generada aleatoriamente por el sistema.

El objetivo principal no es solo recrear el juego, sino trabajar conceptos clave de programación como:

- Manejo de arrays
- Control de índices
- Uso de funciones
- Validación de datos
- Control del flujo del programa

---

## 🎯 Objetivos del proyecto

- 🧠 Mejorar la lógica de programación
- 📊 Trabajar con estructuras de datos (arrays)
- 🔢 Controlar correctamente índices y posiciones
- 🔄 Implementar funciones bien definidas
- 🎮 Simular una interacción real con el usuario

---

## 🕹️ ¿Cómo funciona el juego?

1. El usuario introduce su nombre
2. Se genera una secuencia aleatoria de colores
3. El jugador debe memorizar la secuencia
4. Introduce los colores uno por uno
5. Si acierta:
   - La secuencia aumenta en longitud
6. Si falla:
   - El juego termina

---

## 🎨 Colores disponibles

- 🔴 Rojo (R)
- 🟢 Verde (V)
- 🔵 Azul (A)
- 🟡 Dorado (D)

---

## ⚙️ Funcionamiento técnico

El programa genera una secuencia completa desde el inicio y, en cada ronda, muestra solo una parte de ella.

La longitud inicial es de **3 colores** y aumenta progresivamente hasta que:

- ❌ El jugador falla
- 🏆 Se alcanza la longitud máxima (`MAX_COLORES_SEQ`)

---

## 🧩 Estructura del programa

El proyecto está dividido en varias funciones clave:

### 🔹 `charToColor(color)`
Convierte un carácter introducido por el usuario en un color válido.

### 🔹 `intToColor(numero)`
Convierte un número en su color correspondiente.

### 🔹 `generarSecuencia(numColores)`
Genera la secuencia aleatoria de colores.

### 🔹 `comprobarColor(secuencia, indice, color)`
Comprueba si el color introducido es correcto.

### 🔹 `mostrarSecuencia(secuencia, numero)`
Muestra la secuencia al usuario para memorizar.

### 🔹 `comenzarJuego(nombre, rl)`
Controla toda la lógica del juego.

---

## 📚 Tecnologías utilizadas

- JavaScript
- Node.js
- Módulo `readline`

---

## 💡 Aprendizajes clave

Este proyecto permite desarrollar habilidades fundamentales como:

- Pensamiento lógico
- Estructuración del código
- Validación de entrada de usuario
- Diseño de programas interactivos

---

## 👨‍💻 Autor

Proyecto realizado como práctica académica.

---

## 📌 Nota final

> Este proyecto demuestra cómo, con conceptos básicos de programación, es posible construir aplicaciones interactivas completas y funcionales.

