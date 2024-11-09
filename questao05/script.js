 function inverterString(str) {
    let stringInvertida = ""; //armazena a string invertida
    for (let i = str.length - 1; i >= 0; i--) { // Loop de trás para frente
        stringInvertida += str[i]; // Adiciona o caractere à string invertida
    }
    return stringInvertida; // Retorna a string invertida
}

function invertString() {
    // Pega o valor da string do campo de entrada
    const inputString = document.getElementById("inputString").value;

    // Exibe a string original
    document.getElementById("originalString").innerText = "String Original: " + inputString;

    // Inverte a string
    const inverted = inverterString(inputString);

    // Exibe a string invertida
    document.getElementById("invertedString").innerText = "String Invertida: " + inverted;
}
