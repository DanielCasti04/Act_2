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

// Función para calcular diferencia de tiempo (mejorada)
function calcularTiempo(horaInicio, horaFin) {
  const minutosInicio = convertirHoraAMinutos(horaInicio);
  const minutosFin = convertirHoraAMinutos(horaFin);

  let diferencia = minutosFin - minutosInicio;

  // Manejar cambio de día (si sale al día siguiente)
  if (diferencia < 0) {
    diferencia += 24 * 60; // Agregar 24 horas en minutos
  }

  return diferencia;
}

// Función para calcular el costo a pagar
function calcularCosto(minutosTotal, tarifaPorHora = 2000) {
  if (minutosTotal <= 0) return 0;

  // Convertir minutos a horas (redondeando hacia arriba)
  const horas = Math.ceil(minutosTotal / 60);

  return horas * tarifaPorHora;
}

// Función para calcular cuánto debe pagar un vehículo
function calcularPagoVehiculo(horaEntrada, tarifaPorHora = 2000) {
  const horaSalida = obtenerHoraActual();
  const minutosEstacionado = calcularTiempo(horaEntrada, horaSalida);
  const costoTotal = calcularCosto(minutosEstacionado, tarifaPorHora);

  // Convertir minutos a horas y minutos para mostrar
  const horas = Math.floor(minutosEstacionado / 60);
  const minutos = minutosEstacionado % 60;

  return {
    horaEntrada: horaEntrada,
    horaSalida: horaSalida,
    minutosTotal: minutosEstacionado,
    tiempoFormateado: `${horas}h ${minutos}min`,
    horasCobradas: Math.ceil(minutosEstacionado / 60),
    costoTotal: costoTotal,
  };
}

// Ejemplo de uso:
// Supongamos que un carro entró a las 14:30
const horaEntrada = "14:30";
const infoPago = calcularPagoVehiculo(horaEntrada);

console.log("=== INFORMACIÓN DE PAGO ===");
console.log(`Hora de entrada: ${infoPago.horaEntrada}`);
console.log(`Hora de salida: ${infoPago.horaSalida}`);
console.log(`Tiempo estacionado: ${infoPago.tiempoFormateado}`);
console.log(`Horas a cobrar: ${infoPago.horasCobradas} horas`);
console.log(`Total a pagar: $${infoPago.costoTotal.toLocaleString()}`);

// Función para buscar y calcular pago de un vehículo específico
function calcularPagoporPlaca(placaBuscada, Placas) {
  // Buscar el vehículo en el array
  const vehiculo = Placas.find(
    (v) => v.placa && v.placa.toLowerCase() === placaBuscada.toLowerCase()
  );

  if (!vehiculo) {
    return {
      error: true,
      mensaje: "Vehículo no encontrado",
    };
  }

  // Calcular el pago
  const infoPago = calcularPagoVehiculo(vehiculo.horaEntrada);

  return {
    error: false,
    placa: vehiculo.placa,
    ...infoPago,
  };
}

// Ejemplo con tarifa personalizada (ej: $1500 por hora)
function calcularPagoConTarifaPersonalizada(horaEntrada, tarifa) {
  return calcularPagoVehiculo(horaEntrada, tarifa);
}
