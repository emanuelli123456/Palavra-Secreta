let secretWord = "";
let attemptsLeft = 6;
let guessedLetters = [];
let displayWord = [];
let pontuacao = 0;

const displayPalavra = document.getElementById("areaJogo");
const displayTentativas = document.getElementById("Tentativas");
const displayPontuacao = document.getElementById("pontuação");
const letrasUsadas = document.getElementById("letra-usada");

const inputPalavra = document.getElementById("entrada-palavra");
const btnComecar = document.getElementById("btn-comecar");

const inputTentativa = document.getElementById("tentativa");
const btnTentar = document.getElementById("btn-tentar");


// INICIAR JOGO
function iniciarJogo(){

secretWord = inputPalavra.value.toUpperCase();

if(secretWord === ""){
alert("Digite uma palavra!");
return;
}

inputPalavra.value = "";

// corrigido aqui
displayWord = Array(secretWord.length).fill("_");

attemptsLeft = 6;

guessedLetters = [];

pontuacao = 0;

renderWord();

}


// MOSTRAR PALAVRA
function renderWord(){

displayPalavra.innerHTML = "";

displayWord.forEach(letra => {

const span = document.createElement("span");

// espaço só na visualização
span.innerText = letra + " ";

displayPalavra.appendChild(span);

});

displayTentativas.innerText = attemptsLeft;

displayPontuacao.innerText = pontuacao;

letrasUsadas.innerText = guessedLetters.join(" ");

}


// TENTAR LETRA
function tentarLetra(){

const letra = inputTentativa.value.toUpperCase();

inputTentativa.value = "";

if(letra === "" || guessedLetters.includes(letra)){
return;
}

guessedLetters.push(letra);

if(secretWord.includes(letra)){

for(let i=0;i<secretWord.length;i++){

if(secretWord[i] === letra){

displayWord[i] = letra;

pontuacao += 10;

}

}

}else{

attemptsLeft--;

}

renderWord();

verificarFim();

}


// VERIFICAR FIM
function verificarFim(){

if(!displayWord.includes("_")){

alert("Você ganhou!");

}

else if(attemptsLeft === 0){

alert("Você perdeu! A palavra era: " + secretWord);

}

}


// EVENTOS
btnComecar.addEventListener("click", iniciarJogo);

btnTentar.addEventListener("click", tentarLetra);