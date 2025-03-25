const formTime = document.getElementById("formTime") as HTMLFormElement;
const times = JSON.parse(localStorage.getItem("times") || "[]");
const tabelaTimes= document.getElementById("tbTime") as HTMLElement;

interface Time{
    id: number,
    nomeCompleto: String,
    nomeCurto:String
}
function salvarTime(event:Event){
    event.preventDefault();

    const NovoTime:Time ={
        id: Date.now(),
        nomeCompleto: (document.getElementById("nomeCompleto") as HTMLInputElement).value,
        nomeCurto: (document.getElementById("nomeCurto") as HTMLInputElement).value,
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

function atualizarTabelaTime(){
    tabelaTimes.innerHTML="";

    times.forEach((t:Time) => {
        tabelaTimes.innerHTML+=
        `<tr>
            <td>${t.nomeCompleto}</td>
            <td>${t.nomeCurto}</td>
            <td>
                <button onclick="editarTime(${t.id})"> Editar </button>
                <button onclick="removerTime(${t.id})"> deletar </button>
            </td>
        </tr>`;
    })
}
function removerTime(id:number){
    const timeIndex= times.findIndex((t:Time) => t.id== id);

    if(timeIndex!== -1){
        times.splice(timeIndex, 1);
    }
    salvarTimesLocalStorage();
    atualizarTabelaTime();
}
function editarTime(id:number){
    const time= times.find((t:Time) => t.id==id);
    if(!time) return;

    (document.getElementById("nomeCompleto") as HTMLInputElement).value=time.nomeCompleto;
    (document.getElementById("nomeCurto") as HTMLInputElement).value=time.nomeCurto;
    const timeIndex= times.findIndex((t:Time) => t.id== id);

    if(timeIndex!== -1){
        times.splice(timeIndex, 1);
    }
    salvarTimesLocalStorage();
    atualizarTabelaTime();
}
  
atualizarTabelaTime();