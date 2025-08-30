// Array global para mantener los datos
let almacenar = [];

// Recuperar elementos del HTML
const placaInput = document.getElementById("placa");

// Función para guardar datos
function saveDatos(placa) {
  // Calcular hora actual dentro de la función
  const ahora = new Date();
  const hora = `${ahora.getHours().toString().padStart(2, "0")}:${ahora
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const nuevoDato = {
    placa: placa,
    horaEntrada: hora,
  };
  almacenar.push(nuevoDato);
  localStorage.setItem("datosVehiculos", JSON.stringify(almacenar));
  console.log("auto:", almacenar);
  alert("los datos han sido guardados correctamente");
}

// Función para obtener los datos del formulario y guardar
function guardarDatosFormulario() {
  const placa = placaInput.value;

  if (placa) {
    saveDatos(placa); // ✅ Solo enviar la placa
  } else {
    console.log("Falta la placa");
  }
}
// Para cargar datos al iniciar la página
function cargarDatos() {
  const datosGuardados = localStorage.getItem("datosVehiculos");
  if (datosGuardados) {
    almacenar = JSON.parse(datosGuardados);
    console.log("Datos cargados:", almacenar);
  }
}

window.addEventListener("DOMContentLoaded", cargarDatos);

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  guardarDatosFormulario();
});
console.log(almacenar[1]);

if (placaSalida === almacenar.placa) {
  CacularPago();
}
