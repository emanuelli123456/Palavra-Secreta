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
function iniciarJogo() {
    secretWord = inputPalavra.value.toUpperCase();
    if (secretWord === "") {
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
function renderWord() {
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
function tentarLetra() {
    // CORREÇÃO 1: bloqueio adicionado para quando o jogo ainda não foi iniciado
    // Antes, como displayWord estava vazio, !displayWord.includes("_") retornava
    // true imediatamente, fazendo o jogo declarar vitória com qualquer letra
    if (secretWord === "") {
        alert("Inicie o jogo primeiro!");
        return;
    }

    const letra = inputTentativa.value.toUpperCase();
    inputTentativa.value = "";

    // CORREÇÃO 2: adicionado !/^[A-Z]$/.test(letra) para bloquear números e símbolos
    if (letra === "" || guessedLetters.includes(letra) || !/^[A-Z]$/.test(letra)) {
        return;
    }

    guessedLetters.push(letra);

    if (secretWord.includes(letra)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letra) {
                displayWord[i] = letra;
                pontuacao += 10;
            }
        }
    } else {
        attemptsLeft--;
    }

    renderWord();
    verificarFim();
}

// VERIFICAR FIM
function verificarFim() {
    // CORREÇÃO 3: guarda adicionada para evitar verificação com jogo não iniciado
    // displayWord.length === 0 também cobre o estado inicial antes de iniciarJogo()
    if (secretWord === "" || displayWord.length === 0) return;

    // CORREÇÃO 4: bug original usava " _ " (com espaços) em vez de "_" (sem espaços)
    // Como o array é preenchido com fill("_"), a comparação correta é sem espaços
    if (!displayWord.includes("_")) {
        alert("Você ganhou! Pontuação: " + pontuacao);
        // CORREÇÃO 5: return adicionado para não cair no bloco de derrota logo abaixo
        // quando attemptsLeft chega a 0 exatamente na última letra correta
        return;
    }
    if (attemptsLeft === 0) {
        alert("Você perdeu! A palavra era: " + secretWord);
    }
}

// EVENTOS
btnComecar.addEventListener("click", iniciarJogo);
btnTentar.addEventListener("click", tentarLetra);