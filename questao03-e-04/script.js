// menor valor de faturamento
function menorFaturamento(faturamento) {
    return Math.min(...faturamento.map(item => item.valor));
}

// maior valor de faturamento
function maiorFaturamento(faturamento) {
    return Math.max(...faturamento.map(item => item.valor));
}

// média de faturamento
function mediaFaturamento(faturamento) {
    const faturamentoValido = faturamento.filter(item => item.valor > 0); // Ignora os dias sem faturamento
    const soma = faturamentoValido.reduce((acc, item) => acc + item.valor, 0);
    return soma / faturamentoValido.length; // Média de faturamento válido
}

// dias acima da média
function diasAcimaDaMedia(faturamento, media) {
    return faturamento.filter(item => item.valor > media).length;
}

// valor total mensal de faturamento
function valorTotalMensal(faturamento) {
    const somaTotal = faturamento.reduce((acc, item) => acc + item.valor, 0); // Soma de todos os valores de faturamento
    return somaTotal;
}

//  percentual de faturamento por estado
function calcularPercentuais(estadoFaturamento) {
    const totalFaturamento = Object.values(estadoFaturamento).reduce((acc, valor) => acc + valor, 0);
    const percentuais = {};

    for (const estado in estadoFaturamento) {
        percentuais[estado] = ((estadoFaturamento[estado] / totalFaturamento) * 100).toFixed(2) + "%";
    }
    return percentuais;
}

// Função para processar o XML de faturamento diário
function obterFaturamento() {
    fetch('dados.xml') // 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.text(); // 
        })
        .then(xmlData => {
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "application/xml");

            const dias = xmlDoc.getElementsByTagName('dia');
            const faturamentoDiario = [];

            for (let i = 0; i < dias.length; i++) {
                const dia = dias[i].textContent.trim();
                const valor = parseFloat(dias[i].nextElementSibling.textContent.trim());
                faturamentoDiario.push({ dia, valor });
            }

            // Filtra os dias com faturamento válido (maior que 0)
            const faturamentoValido = faturamentoDiario.filter(item => item.valor > 0);

            // Calcula os valores de faturamento
            const menor = menorFaturamento(faturamentoValido);
            const maior = maiorFaturamento(faturamentoValido);
            const media = mediaFaturamento(faturamentoDiario);
            const diasAcima = diasAcimaDaMedia(faturamentoDiario, media);
            const totalMensal = valorTotalMensal(faturamentoDiario); // Cálculo do valor total mensal

            // Exibe os resultados de faturamento diário
            document.getElementById('menor-faturamento').innerText = menor.toFixed(2);
            document.getElementById('maior-faturamento').innerText = maior.toFixed(2);
            document.getElementById('media-faturamento').innerText = media.toFixed(2);
            document.getElementById('dias-acima-media').innerText = diasAcima;
            document.getElementById('valor-total-mensal').innerText = totalMensal.toFixed(2); // Exibe o valor total mensal

            // faturamento por estado
            const estadoFaturamento = {
                "SP": 67836.43,
                "RJ": 36678.66,
                "MG": 29229.88,
                "ES": 27165.48,
                "Outros": 19849.53
            };

            // Calcula os percentuais por estado
            const percentuais = calcularPercentuais(estadoFaturamento);

            // Exibe os percentuais na tabela
            const percentuaisEstados = document.getElementById('percentuais-estados');
            for (const estado in percentuais) {
                const row = percentuaisEstados.querySelector(`tr:nth-child(${Object.keys(percentuais).indexOf(estado) + 1})`);
                row.cells[1].innerText = percentuais[estado];
            }
        })
        .catch(error => {
            console.error('Erro ao processar os dados:', error);
            alert('Erro ao carregar os dados. Verifique o console para mais detalhes.');
        });
}
obterFaturamento();
