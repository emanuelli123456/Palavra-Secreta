#Projeto SA-Jogo Descubra a Palavra

##Curso
Tecnico em desemvolvimento de Sistemas
UC: Lógica de Progamação

#Descrição do projeto
Desnvolvimento de um **Jogo de advinhação de palavras para web. O objetivo é aplicar conceitos fundamentais 
de lógica de porgramação, manipulação de DOM e organização de código em um projeto real de desnvolvimento. O jogador deve descobrir uma palavra secreta tentando adivinhar letras, com um número limitado de tentativas.


1) Como organizamos nosso projeto?
   Comecei pelo html, procurei videos sobre a estrutura e também apliquei o que foi explicado em sala;
   Depois utilizei o css procurando relmbrar os ensinos passados(como os professores anteriores), e juntando como os seus ensinamentos.
   
2) O que foi mais difícil no layout?
A parte da conexão entre o html e o css, mas mais dificuldade nas estruturas do html.

3) Nossa interface está preparada para receber JavaScript? Por quê?
sim, mas ainda precisa de ajuste na parte do html porque ficará muito confuso





 **HTML**

<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Palavra Secreta</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<main>

<section class="comeco">

<h1>Descubra A Palavra</h1>

<input type="password" id="entrada-palavra" placeholder="Palavra secreta">


<button id="btn-comecar">Começar</button>

</section>


<section class="status">

<section id="areaSegredo">

<label>Digite a Palavra Secreta</label>

<br><br>

<section id="areaJogo"></section>

</section>


<div class="input-area">

<input type="text" id="tentativa" maxlength="1" placeholder="Letra">

<button id="btn-tentar">Enviar</button>

</div>


<div class="info">

<p>Tentativas restantes: <span id="Tentativas">6</span></p>

<p>Pontuação: <span id="pontuação">0</span></p>

<p>Letras usadas: <span id="letra-usada"></span></p>

</div>

</section>

</main>

<script src="script.js"></script>

</body>

</html>






**JAVASCRIPT**
let secretWord = "";
let attemptsLeft = 6;
let guessedLetters = [];
let displayWord = [];
let pontuacao = 0;


// ELEMENTOS HTML

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

span.innerText = letra;

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

if(attemptsLeft === 0){

alert("Você perdeu! A palavra era: " + secretWord);

}

}


// EVENTOS

btnComecar.addEventListener("click", iniciarJogo);

btnTentar.addEventListener("click", tentarLetra);





**CSS**
.comeco{
color: palevioletred;
font-family:amoria;
height: 20vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: radial-gradient(circle at top,#3c00bf,#050510);
border-radius: 60px;
border: 1px solid violet;
padding: 20px;
margin: 20px;

}
body{
    background-color: indigo;
    color: aquamarine;
    display:  flex;
    justify-content: center;
    align-items:center;
    height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ;
    cursor: grab;

}

input{
    border-radius: 20px;
    padding: 10px 20px;
    border: none;

}
.palavra-container span{
    font-size: 2rem;
    margin: 0 10px;
    border-bottom:purple;

}
#btn-tentar{
    padding: 10px 20px;
    cursor: wait;

    transition: 0.3s;

}
#btn-tentar:hover{
    background-color: magenta;
    color: white;
 
}

#entrada-Letra:focus{
    border: 2px solid cyan;
    outline: none;

}




