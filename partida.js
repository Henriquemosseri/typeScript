"use strict";
// Variáveis globais
const formPartida = document.getElementById("formPartida");
const tabelaPartidas = document.getElementById("tbPartidas");
const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function carregarCampeonatosNoSelect() {
    const selectCampeonatos = document.getElementById("campeonatoId");
    selectCampeonatos.innerHTML = "<option value= ''> Selecione</option>";
    campeonatos.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = c.nome;
        selectCampeonatos.appendChild(option);
    });
}
function atualizarTabelaPartidas() {
    tabelaPartidas.innerHTML = `
    <thead>
      <tr>
        <th>Campeonato</th>
        <th>Time Mandante</th>
        <th>Time Visitante</th>
        <th>Data</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
  `;
    partidas.forEach((partida) => {
        const campeonato = campeonatos.find((c) => c.id === partida.campeonatoId);
        tabelaPartidas.innerHTML += `
      <tr>
        <td>${campeonato ? campeonato.nome : "Desconhecido"}</td>
        <td>${partida.timeMandante}</td>
        <td>${partida.timeVisitante}</td>
        <td>${partida.dataPartida}</td>
        <td>
          <button onclick="editarPartida(${partida.id})">Editar</button>
          <button onclick="removerPartida(${partida.id})">Remover</button>
        </td>
      </tr>
    `;
    });
    tabelaPartidas.innerHTML += `</tbody>`;
}
function salvarPartida(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    const novaPartida = {
        id: Date.now(),
        campeonatoId: parseInt(document.getElementById("campeonatoId").value),
        timeMandante: document.getElementById("mandante").value,
        timeVisitante: document.getElementById("visitante").value,
        dataPartida: document.getElementById("data").value,
    };
    partidas.push(novaPartida);
    atualizarTabelaPartidas();
    salvarPartidasLocalStorage();
    formPartida.reset();
    alert("Partida cadastrada com sucesso!");
}
function salvarPartidasLocalStorage() {
    localStorage.setItem("partidas", JSON.stringify(partidas));
}
function removerPartida(id) {
    const partidaIndex = partidas.findIndex((p) => p.id === id);
    if (partidaIndex !== -1) {
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidasLocalStorage();
    atualizarTabelaPartidas();
}
function editarPartida(id) {
    const partida = partidas.find((p) => p.id === id);
    if (!partida)
        return;
    document.getElementById("mandante").value = partida.timeMandante;
    document.getElementById("visitante").value = partida.timeVisitante;
    document.getElementById("data").value = partida.dataPartida;
    document.getElementById("campeonatoId").value = partida.campeonatoId.toString();
    // Remover a partida do array para não duplicá-la
    const campIndex = partidas.findIndex((p) => p.id === id);
    if (campIndex !== -1) {
        // Remover a partida da lista
        partidas.splice(campIndex, 1);
    }
    salvarPartidasLocalStorage();
    atualizarTabelaPartidas();
}
// Carregar os campeonatos no <select> assim que a página for carregada
carregarCampeonatosNoSelect();
// Atualizar a tabela de partidas ao carregar a página
atualizarTabelaPartidas();
