document.addEventListener('DOMContentLoaded', function () {
    function search() {
        const buttonSearch = document.getElementById('button_search');

        buttonSearch.addEventListener('click', function () {
            const inputSearch = document.getElementById('input_Search').value.toLowerCase();

            const transactions = document.querySelectorAll('.tbodys tr');
            transactions.forEach(function (transaction) {
                const transactionInvestmentType = transaction.querySelector('td:nth-child(1)').textContent.toLowerCase();
                console.log("Tipo de investimento na transação:", transactionInvestmentType); // Log para debug

                const matchesInvestmentType = inputSearch === "" || transactionInvestmentType.includes(inputSearch);


                if (matchesInvestmentType) {
                    transaction.style.display = '';
                } else {
                    transaction.style.display = 'none';
                }
            });
        });
    }

    search();
});