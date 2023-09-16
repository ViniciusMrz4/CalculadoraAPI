// Variáveis para controlar a calculadora
let history = [];

// Função para atualizar o resultado na calculadora
function updateResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `${result}`;
}

function enviarParaAPI() {
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var n = document.getElementById('n').value;
    var figura = "Elipse"

    var dados = {
        a: a,
        b: b,
        n: n,
        figura: figura
    };

    // Fazer uma solicitação POST para a API
    fetch('https://conicalcapi--viniciusmrz4.repl.co/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = "Resultado" + data.resultado;
        var resultado = parseFloat(data.resultado); // Converte o resultado para número
        // Verifica se a resposta da API foi bem-sucedida
        if (!isNaN(resultado)) { // Verifica se é um número
            // Atualiza o resultado
            updateResult(data.resultado);

            // Atualiza o histórico
            history.push(data.resultado);
            updateHistory();
        } else {
            // Trata erro se a resposta da API não tiver um resultado
            console.error('Erro na resposta da API:', data.error);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar para a API:', error);
    });
}

// Função para atualizar o histórico na página
function updateHistory() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

// Função para armazenar o histórico no localStorage
function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

// Função para recuperar o histórico armazenado e preencher na página
function loadHistory() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        updateHistory();
    }
}

// Carregue o histórico armazenado ao carregar a página
window.onload = loadHistory;

// Salve o histórico sempre que houver uma alteração na estrutura de histórico (opcional)
window.addEventListener('beforeunload', saveHistory);

// Restante do código do JavaScript

// Função para limpar o histórico
function clearHistory() {
    history = []; // Limpa o histórico na memória
    localStorage.removeItem('calculatorHistory'); // Remove o histórico do localStorage
    updateHistory(); // Atualiza a interface para refletir o histórico vazio
}
