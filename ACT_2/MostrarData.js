console.log(Placas);

let listaExistentes = document.getElementById("lista");

listaExistentes.innerHTML = "";

for (let i = 0; i < Placas.length; i++) {
  listaExistentes.innerHTML += `<li>
            <p>Placa: ${Placas[i].placa}</p>
            <p>Hora Entrada: ${Placas[i].horaEntrada}</p>
        </li>`;
}
