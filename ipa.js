let toast = document.querySelector(".toast");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'bdb5952f33mshe20f85b10163cccp155f4djsnbde8ddb636f2',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
};
let wordIPA = document.querySelector('#wordIPA');
document.querySelector("#getBtn").onclick = ()=>{
    let word = document.querySelector("#queryWord").value;
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/pronunciation`, options)
    .then(response => response.json())
        .then(response => {
            wordIPA.innerHTML = `/${response.pronunciation.all}/`
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
        console.log(opc);
        if(opc <= 0){
            elem.style.display = "none";
            clearInterval(i);
        }else if(opc <=1){
            elem.style.opacity = opc;
        }
    }, 10)
}
console.log(toast);
async function copyText(){
    if(wordIPA.innerHTML != ""){
        console.log("Here")
        navigator.clipboard.writeText(wordIPA.innerHTML)
        .then(
            fadeElem(document.querySelector(".toast"))
        )
    }
}


