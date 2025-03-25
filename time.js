"use strict";
const formTime = document.getElementById("formTime");
const times = JSON.parse(localStorage.getItem("times") || "[]");
const tabelaTimes = document.getElementById("tbTime");
function salvarTime(event) {
    event.preventDefault();
    const NovoTime = {
        id: Date.now(),
        nomeCompleto: document.getElementById("nomeCompleto").value,
        nomeCurto: document.getElementById("nomeCurto").value,
    };
    times.push(NovoTime);
    salvarTimesLocalStorage();
    atualizarTabelaTime();
    formTime.reset();
    alert("Partida cadastrada com sucesso!");
}
function salvarTimesLocalStorage() {
    localStorage.setItem("times", JSON.stringify(times));
}
function atualizarTabelaTime() {
    tabelaTimes.innerHTML = "";
    times.forEach((t) => {
        tabelaTimes.innerHTML +=
            `<tr>
            <td>${t.nomeCompleto}</td>
            <td>${t.nomeCurto}</td>
            <td>
                <button onclick="editarTime(${t.id})"> Editar </button>
                <button onclick="removerTime(${t.id})"> deletar </button>
            </td>
        </tr>`;
    });
}
function removerTime(id) {
    const timeIndex = times.findIndex((t) => t.id == id);
    if (timeIndex !== -1) {
        times.splice(timeIndex, 1);
    }
    salvarTimesLocalStorage();
    atualizarTabelaTime();
}
function editarTime(id) {
    const time = times.find((t) => t.id == id);
    if (!time)
        return;
    document.getElementById("nomeCompleto").value = time.nomeCompleto;
    document.getElementById("nomeCurto").value = time.nomeCurto;
    const timeIndex = times.findIndex((t) => t.id == id);
    if (timeIndex !== -1) {
        times.splice(timeIndex, 1);
    }
    salvarTimesLocalStorage();
    atualizarTabelaTime();
}
atualizarTabelaTime();
