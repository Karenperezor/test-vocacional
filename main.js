let indicePregunta = 0;
let respuestas = [];

const preguntas = [
  {
    texto: "¿Prefieres trabajar solo o en equipo?",
    opciones: ["Solo", "En equipo"]
  },
  {
    texto: "¿Te gusta resolver problemas lógicos o expresar ideas creativas?",
    opciones: ["Problemas lógicos", "Ideas creativas"]
  },
  {
    texto: "¿Disfrutas ayudar a otras personas?",
    opciones: ["Sí", "No"]
  },
  {
    texto: "¿Te interesa saber cómo funcionan las cosas por dentro?",
    opciones: ["Sí", "No"]
  },
  {
    texto: "¿Te sentirías cómodo memorizando mucha información?",
    opciones: ["Sí", "No"]
  }
];

const carreras = {
  tecnologia: ["Ingeniería en Sistemas", "Desarrollo Web", "Ciberseguridad"],
  salud: ["Medicina", "Enfermería", "Psicología"],
  creatividad: ["Diseño Gráfico", "Animación Digital", "Publicidad"],
  social: ["Trabajo Social", "Pedagogía", "Derecho"]
};

function mostrarPregunta() {
  const contenedor = document.getElementById("pregunta-container");
  const opcionesContenedor = document.getElementById("opciones-container");
  const preguntaActual = preguntas[indicePregunta];

  contenedor.innerHTML = `<h3>${preguntaActual.texto}</h3>`;
  opcionesContenedor.innerHTML = "";

  preguntaActual.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => {
      respuestas.push(opcion);
      document.getElementById("btn-siguiente").style.display = "block";
    };
    opcionesContenedor.appendChild(btn);
  });

  document.getElementById("btn-siguiente").style.display = "none";
}

function siguientePregunta() {
  indicePregunta++;
  if (indicePregunta < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("pregunta-container").style.display = "none";
  document.getElementById("opciones-container").style.display = "none";
  document.getElementById("btn-siguiente").style.display = "none";

  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";

  let sugerencias = [];

  if (respuestas.includes("Problemas lógicos")) {
    sugerencias.push(...carreras.tecnologia);
  }
  if (respuestas.includes("Ideas creativas")) {
    sugerencias.push(...carreras.creatividad);
  }
  if (respuestas.includes("Sí") && respuestas[2] === "Sí") {
    sugerencias.push(...carreras.salud);
  }
  if (respuestas.includes("En equipo") && respuestas.includes("Ayudar")) {
    sugerencias.push(...carreras.social);
  }

  resultado.innerHTML = `
    <h2>Carreras sugeridas</h2>
    <ul>${sugerencias.map(c => `<li>${c}</li>`).join("")}</ul>
    <p>¡Gracias por hacer el test!</p>
  `;
}

// Inicia el test
mostrarPregunta();
