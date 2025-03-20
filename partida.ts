// Variáveis globais
const formPartida = document.getElementById("formPartida") as HTMLFormElement;
const tabelaPartidas = document.getElementById("tbPartidas") as HTMLElement;
const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");

interface Partida {
    id: number;
    campeonatoId: number;
    timeMandante: string;
    timeVisitante: string;
    dataPartida: string;
}

var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function carregarCampeonatosNoSelect() {
    const selectCampeonatos = document.getElementById("campeonatoId") as HTMLSelectElement;
    selectCampeonatos.innerHTML = "<option value= ''> Selecione</option>";
    campeonatos.forEach((c: Campeonato) => {
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

    partidas.forEach((partida: Partida) => {
        const campeonato = campeonatos.find((c: Campeonato) => c.id === partida.campeonatoId);
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

function salvarPartida(event: Event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const novaPartida: Partida = {
        id: Date.now(),
        campeonatoId: parseInt((document.getElementById("campeonatoId") as HTMLSelectElement).value),
        timeMandante: (document.getElementById("mandante") as HTMLInputElement).value,
        timeVisitante: (document.getElementById("visitante") as HTMLInputElement).value,
        dataPartida: (document.getElementById("data") as HTMLInputElement).value,
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

function removerPartida(id: number) {
    const partidaIndex = partidas.findIndex((p: Partida) => p.id === id);
    if (partidaIndex !== -1) {
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidasLocalStorage();
    atualizarTabelaPartidas();
}

function editarPartida(id: number) {
    const partida = partidas.find((p: Partida) => p.id === id);
    if (!partida) return;

    (document.getElementById("mandante") as HTMLInputElement).value = partida.timeMandante;
    (document.getElementById("visitante") as HTMLInputElement).value = partida.timeVisitante;
    (document.getElementById("data") as HTMLInputElement).value = partida.dataPartida;
    (document.getElementById("campeonatoId") as HTMLSelectElement).value = partida.campeonatoId.toString();

    // Remover a partida do array para não duplicá-la
    const campIndex = partidas.findIndex((p: Partida) => p.id === id);

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

