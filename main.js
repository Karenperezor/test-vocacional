let indicePregunta = 0;
let respuestas = [];
const totalPreguntas = 50;

// Preguntas simuladas (puedes remplazarlas con las reales)
const preguntas = Array.from({ length: totalPreguntas }, (_, i) => ({
  texto: `Pregunta ${i + 1}: ¿Cómo te sientes respecto a esta situación?`,
  opciones: ["Muy bien", "Regular", "Mal"]
}));

const carreras = {
  tecnologia: ["Ingeniería de Software", "Desarrollo Web", "Ciberseguridad"],
  creatividad: ["Diseño Gráfico", "Publicidad", "Animación Digital"],
  social: ["Psicología", "Trabajo Social", "Educación"]
};

function mostrarPregunta() {
  const pregunta = preguntas[indicePregunta];
  const contenedor = document.getElementById("pregunta-container");
  const opcionesContenedor = document.getElementById("opciones-container");
  const contador = document.getElementById("contador");

  contador.textContent = `Pregunta ${indicePregunta + 1} de ${totalPreguntas}`;
  contenedor.innerHTML = `<h3>${pregunta.texto}</h3>`;
  opcionesContenedor.innerHTML = "";

  pregunta.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => {
      respuestas.push(opcion);
      document.getElementById("btn-siguiente").style.display = "block";
    };
    opcionesContenedor.appendChild(btn);
  });

  actualizarProgreso();
  document.getElementById("btn-siguiente").style.display = "none";
}

function actualizarProgreso() {
  const porcentaje = ((indicePregunta) / totalPreguntas) * 100;
  document.getElementById("progress-bar").style.width = `${porcentaje}%`;
}

function siguientePregunta() {
  indicePregunta++;
  if (indicePregunta < totalPreguntas) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("pregunta-container").style.display = "none";
  document.getElementById("opciones-container").style.display = "none";
  document.getElementById("btn-siguiente").style.display = "none";
  document.getElementById("contador").style.display = "none";

  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";

  // Lógica de prueba
  let sugerencias = [];

  const respuestasLargas = respuestas.filter(r => r === "Muy bien").length;

  if (respuestasLargas > 35) {
    sugerencias.push(...carreras.tecnologia);
  } else if (respuestasLargas > 20) {
    sugerencias.push(...carreras.creatividad);
  } else {
    sugerencias.push(...carreras.social);
  }

  resultado.innerHTML = `
    <h2>Carreras sugeridas</h2>
    <ul>${sugerencias.map(c => `<li>${c}</li>`).join("")}</ul>
    <p>¡Gracias por hacer el test!</p>
  `;

  document.getElementById("progress-bar").style.width = "100%";
}
mostrarPregunta();
