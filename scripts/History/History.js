const TopTransactions = {
  getAllTransactions() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },

  getMonthWithHighestExpenses() {
    const allTransactions = this.getAllTransactions();
    const monthlyExpenses = {};

    allTransactions.forEach(transaction => {
      // Dividir a data em dia, mês e ano usando split('/')
      const parts = transaction.date.split('/');
      const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // Reorganizar para mm/dd/yyyy
      const date = new Date(formattedDate);

      // Verificar se a data é válida
      if (!isValidDate(date)) {
        console.warn(`Ignorando transação com data inválida: ${transaction.description}`);
        return; // Ignora esta transação
      }

      const monthKey = `${date.toLocaleString('pt-BR', { month: 'long' })} `;


      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = 0;
      }

      monthlyExpenses[monthKey] += transaction.amount;
    });

    let highestMonth = null;
    let highestExpense = -Infinity;

    Object.entries(monthlyExpenses).forEach(([monthKey, totalExpense]) => {
      if (totalExpense > highestExpense) {
        highestExpense = totalExpense;
        highestMonth = monthKey;
      }
    });

    document.querySelector(".date").innerHTML = highestMonth || "Nenhum mês encontrado";

    return highestMonth;
  },

  renderMonthWithHighestExpenses() {
    const highestMonth = this.getMonthWithHighestExpenses();

    // Exibir o mês com maior gasto na interface
    const monthDisplay = document.querySelector("#highestMonthDisplay");
    if (monthDisplay) {
      monthDisplay.textContent = highestMonth || "Nenhum mês encontrado";
    }
  }
};

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

document.addEventListener("DOMContentLoaded", function() {
  TopTransactions.renderMonthWithHighestExpenses();
});
