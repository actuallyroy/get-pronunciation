let toast = document.querySelector(".toast");
let queryInput = document.querySelector("#queryWord");
async function readClipboard(){
    await navigator.clipboard.readText()
    .then(text =>{
        queryInput.value = text;
        document.querySelector("#getBtn").click();
    })
}

queryInput.onfocus = () => {
    console.log("here")
    readClipboard();
};
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'bdb5952f33mshe20f85b10163cccp155f4djsnbde8ddb636f2',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
};
let wordIPA = document.querySelector('#wordIPA');
document.querySelector("#getBtn").onclick = ()=>{
    let word = queryInput.value;
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/pronunciation`, options)
    .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.pronunciation.all){
                wordIPA.innerHTML = `/${response.pronunciation.all}/`
            }else if(res.pronunciation.adjective){
                wordIPA.innerHTML = `/${response.pronunciation.adjective}/`
            } else if (res.pronunciation.noun) {
                wordIPA.innerHTML = `/${response.pronunciation.noun}/`;
            } else if (res.pronunciation.verb) {
                wordIPA.innerHTML = `/${response.pronunciation.verb}/`;
            } else {
                wordIPA.innerHTML = `/${response.pronunciation}/`;
            }
        })
        .catch(err => console.error(
            toast.innerHTML = 'Try a word or phrase',
            fadeElem(toast)
        ));
}

document.querySelector("svg").onclick = () =>{
    toast.innerHTML = "Copied to clipboard"
    copyText();
}

function fadeElem(elem){
    elem.style.display = 'inherit'
    elem.style.opacity = 1;
    let opc = 1.5;
    let i = setInterval(() => {
        opc-=0.01;
        if(opc <= 0){
            elem.style.display = "none";
            clearInterval(i);
        }else if(opc <=1){
            elem.style.opacity = opc;
        }
    }, 10)
}

async function copyText(){
    if(wordIPA.innerHTML != ""){
        navigator.clipboard.writeText(wordIPA.innerHTML)
        .then(
            fadeElem(document.querySelector(".toast"))
        )
    }
}