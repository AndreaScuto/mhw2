
let scelte = {};

const reset = document.querySelector(".Tastoreset");

const Risposte = document.querySelectorAll(".choice-grid div");

for (const Risposta of Risposte)
{
    Risposta.addEventListener("click", ChangeCHECKBOX);
}

function ChangeCHECKBOX (event)
{
    const contenitore = event.currentTarget;
    contenitore.style.backgroundColor = "#cfe3ff";
    contenitore.style.opacity = "1";
    const img = contenitore.querySelector("img.checkbox");
    img.src = "images/checked.png";

    Verifica(contenitore);
    
    if (contaCHECKBOX() === 3)
    {
        const RIS = document.querySelector("div.container-risultato");
        RIS.style.display = "block";
        for (const Risposta of Risposte)
        {
            Risposta.removeEventListener("click", ChangeCHECKBOX);
        }
        reset.addEventListener("click", resetquiz);
        AssegnaScelte(scelte);
        RiempiTesto(scelte);
    }
}

function AssegnaScelte (Scelte)
{
    for (const Risposta of Risposte)
    {
        const img = Risposta.querySelector("img.checkbox");
        if (img.src.includes("images/checked.png"))
        {
            Scelte[Risposta.dataset.questionId] = Risposta.dataset.choiceId;
        }
    }
    console.log(Scelte);
}

function LogicaScelta (scelte)
{
    if (scelte["two"] === scelte["three"])
        scelta = scelte["two"];
    else scelta = scelte["one"];
    return scelta;
}


function Verifica (contenitore)
{
    for (const Risposta of Risposte)
    {
        if (Risposta != contenitore && contenitore.dataset.questionId === Risposta.dataset.questionId)
        {
            const img = Risposta.querySelector("img.checkbox");
            img.src = "images/unchecked.png";
            Risposta.style.backgroundColor = "#f4f4f4";
            Risposta.style.opacity = "0.6"; 
        }
    }
}

function resetquiz ()
{
    for (const Risposta of Risposte)
    {
        Risposta.style.backgroundColor = "#f4f4f4";
        Risposta.style.opacity = "1";
        const img = Risposta.querySelector("img.checkbox");
        img.src = "images/unchecked.png";
        Risposta.addEventListener("click", ChangeCHECKBOX);
    }
    const RIS = document.querySelector("div.container-risultato");
    RIS.style.display = "none";
    reset.removeEventListener("click", resetquiz);
    scelte = {};
    window.scrollTo(0, 0);
}

function contaCHECKBOX ()
{
    let contatore = 0;
    for (const Risposta of Risposte)
    {
        const img = Risposta.querySelector("img.checkbox");
        if (img.src.includes("images/checked.png"))
        {
            contatore++;
        }
    }
    return contatore;
}

function RiempiTesto (scelte)
{
    let scelta = LogicaScelta(scelte);
    const Testo = document.querySelector("div.container-risultato p");
    const Titolo = document.querySelector("div.container-risultato h1");
    Titolo.textContent = RESULTS_MAP[scelta].title;
    Testo.textContent = RESULTS_MAP[scelta].contents;
}
