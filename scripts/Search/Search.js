function search() {
    const buttonSearch = document.getElementById('button_search');

    buttonSearch.addEventListener('click', function () {
        const searchText = document.getElementById('input_Search').value.trim().toLowerCase();
        const transactions = document.querySelectorAll('.tbodys tr');
        console.log(transactions)

        transactions.forEach(function (transaction) {
            const transactionDescription = transaction.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const transactionValue = transaction.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const transactionDate = transaction.querySelector('td:nth-child(3)').textContent.toLowerCase();

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
