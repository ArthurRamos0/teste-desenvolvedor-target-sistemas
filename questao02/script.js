function pertenceAFibonacci(numero) {
    let a = 0;
    let b = 1;

    // se o número for 0 ou 1, ele já faz parte da sequência
    if (numero === 0 || numero === 1) {
        return true;
    }

    // Calcula a sequência 
    while (b < numero) {
        let temp = b;
        b = a + b;
        a = temp;
    }

    // Verifica se o número faz parte da sequência
    return b === numero;
}

// Função chamada ao clicar no botão
function verificarFibonacci() {
    let numero = parseInt(document.getElementById('numero').value);

    // Verifica se o número foi fornecido
    if (isNaN(numero)) {
        document.getElementById('resultado').innerText = "Por favor, insira um número válido!";
        return;
    }

    // Verifica se o número faz parte da sequência de Fibonacci
    if (pertenceAFibonacci(numero)) {
        document.getElementById('resultado').innerText = `${numero} pertence à sequência de Fibonacci. Isso ai!`;
    } else {
        document.getElementById('resultado').innerText = `${numero} não pertence à sequência de Fibonacci. Tente outro número!`;
    }
}