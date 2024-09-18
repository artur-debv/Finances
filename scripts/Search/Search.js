function search() {
    const inputSearch = document.getElementById('input_Search');

    // Escutando o evento de digitação no input
    inputSearch.addEventListener('input', function () {
        const searchText = inputSearch.value
        const transactions = document.querySelectorAll('.tbodys tr');  // Seleciona todas as linhas da tabela

        // Itera sobre cada transação (linha da tabela)
        transactions.forEach(function (transaction) {
            const transactionDescription = transaction.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const transactionValue = transaction.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const transactionDate = transaction.querySelector('td:nth-child(3)').textContent.toLowerCase();

            // Verifica se algum dos campos inclui o texto digitado
            if (transactionDescription.includes(searchText) ||
                transactionValue.includes(searchText) ||
                transactionDate.includes(searchText)) {
                transaction.style.display = ''; // Exibe a transação se houver correspondência
            } else {
                transaction.style.display = 'none'; // Oculta a transação se não houver correspondência
            }
        });
    });
}
