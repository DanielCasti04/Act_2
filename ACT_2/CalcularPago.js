// Cargar datos de vehículos
let Placas = JSON.parse(localStorage.getItem("datosVehiculos")) || [];
console.log("Vehículos cargados:", Placas);

// Elementos del DOM
const placaSalidaInput = document.getElementById("placaSalida");

// Función para obtener hora actual
function obtenerHoraActual() {
  const ahora = new Date();
  return `${ahora.getHours().toString().padStart(2, "0")}:${ahora
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

// Función para convertir hora a minutos
function convertirHoraAMinutos(hora) {
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
}

// Función para calcular diferencia de tiempo
function calcularTiempo(horaInicio, horaFin) {
  const minutosInicio = convertirHoraAMinutos(horaInicio);
  const minutosFin = convertirHoraAMinutos(horaFin);

  let diferencia = minutosFin - minutosInicio;

  // Manejar cambio de día
  if (diferencia < 0) {
    diferencia += 24 * 60;
  }

  const horas = Math.floor(diferencia / 60);
  const minutos = diferencia % 60;

  return {
    totalMinutos: diferencia,
    horas: horas,
    minutos: minutos,
    formato: `${horas}h ${minutos}min`,
  };
}
