let INDICE = 13;
        let SOMA = 0;
        let K = 0;

        // Laço de repetição para calcular a SOMA
        while (K < INDICE) {
            K = K + 1; // adiciona o valor de K
            SOMA = SOMA + K; // adiciona K a soma
        }

        //resultado da soma na página
        document.getElementById('resultadoSoma').innerText = 'Resultado da soma: ' + SOMA;
    