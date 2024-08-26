document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    // Cria o objeto com os dados da transação
    const transactionData = {
        description: description,
        amount: amount
    };

    console.log(transactionData)

    // Faz a solicitação POST para a API do Sheet Monkey
    fetch("https://api.sheetmonkey.io/form/jxtYmjVnUoWL7zCNeE7XjQ", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transactionData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Transação adicionada com sucesso:", data);
        // Aqui você pode adicionar lógica adicional, como limpar o formulário ou mostrar uma mensagem de sucesso
    })
    .catch(error => {
        console.error("Erro ao adicionar transação:", error);
    });
});