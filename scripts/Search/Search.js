


function search() {
    const inputSearch = document.getElementById('input_Search'); // Seleciona o campo de input

    // Escutando o evento de digitação no input
    inputSearch.addEventListener('input', function () {
        const searchText = inputSearch.value.trim().toLowerCase();  // Pega o texto digitado
        const transactions = document.querySelectorAll('.tbodys tr');  // Seleciona todas as linhas da tabela

        // Itera sobre cada transação (linha da tabela)
        transactions.forEach(function (transaction) {
            const transactionDescription = transaction.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const transactionValue = transaction.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const transactionDate = transaction.querySelector('td:nth-child(3)').textContent.toLowerCase();

            // Verifica se o texto digitado corresponde a algum campo da linha
            if (transactionDescription.includes(searchText) ||
                transactionValue.includes(searchText) ||
                transactionDate.includes(searchText)) {
                transaction.style.display = ''; // Mostra a linha se houver correspondência
            } else {
               alert("Nenhum resultado encontrado");
            }
        });
    });
}


search();
