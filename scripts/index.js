
const Modal = {
  // Objeto responsável por controlar a exibição do modal
  open() {
    document.querySelector(".modal-overlay").classList.add("active"); // Adiciona a classe "active" para mostrar o modal
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active"); // Remove a classe "active" para ocultar o modal
  },
};

const CardColor = {
  // Objeto responsável por controlar as cores dos cards de acordo com o saldo total
  positive() {
    document.querySelector(".card.total").classList.remove("negative"); // Remove a classe "negative" para mostrar o saldo como positivo
    document.querySelector(".card.total").classList.add("positive"); // Adiciona a classe "positive" para mostrar o saldo como positivo
  },
  negative() {
    document.querySelector(".card.total").classList.remove("positive"); // Remove a classe "positive" para mostrar o saldo como negativo
    document.querySelector(".card.total").classList.add("negative"); // Adiciona a classe "negative" para mostrar o saldo como negativo
  },
};

const Storage = {
  // Objeto responsável por lidar com o armazenamento de transações no localStorage
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []; // Obtém as transações armazenadas no localStorage ou retorna um array vazio se não houver transações
  },
  set(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    ); // Define as transações no localStorage após converter para JSON
  },
};

const Transaction = {
  all: Storage.get(), // Obtém todas as transações armazenadas no localStorage
  add(transaction) {
    this.all.push(transaction); // Adiciona a nova transação ao array de transações
    App.reload(); // Recarrega a aplicação para refletir a mudança
  },
  remove(index) {
    Transaction.all.splice(index, 1); // Remove a transação com o índice especificado do array de transações

    App.reload(); // Recarrega a aplicação para refletir a mudança
  },
  incomes() {
    // Calcula o total de entradas
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount; // Soma o valor da transação se for uma entrada
      }
    });
    return income; // Retorna o total de entradas
  },
  expenses() {
    // Calcula o total de saídas
    let expense = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount; // Soma o valor da transação se for uma saída
      }
    });
    return expense; // Retorna o total de saídas
  },
  total() {
    // Calcula o saldo total (entradas - saídas)
    return Transaction.incomes() + Transaction.expenses(); // Retorna a diferença entre o total de entradas e o total de saídas
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"), // Seleciona o elemento que contém a lista de transações

  addTransaction(transactions, index) {
    // Adiciona uma transação à lista de transações
    const tr = document.createElement("tr"); // Cria um novo elemento 'tr' (linha da tabela)
    tr.innerHTML = DOM.innerHTMLTransaction(transactions, index); // Define o conteúdo HTML da linha da tabela
    tr.dataset.index = index; // Define o atributo 'data-index' da linha da tabela com o índice da transação

    DOM.transactionsContainer.prepend(tr); // Adiciona a linha da tabela ao container de transações
  },

  innerHTMLTransaction(transactions, index) {
    // Retorna o HTML de uma transação
    const CSSclass = transactions.amount > 0 ? "income" : "expense"; // Define a classe CSS com base no valor da transação
    const amount = Utils.formatCurrency(transactions.amount); // Formata o valor da transação como uma moeda
    const html = `
        <td class="description">${transactions.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transactions.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" class="remove" alt="Remover Transação">
        </td>
        `;
    return html; // Retorna o HTML da transação
  },

  updateBalance() {
    // Atualiza o saldo total e as entradas e saídas na interface do usuário
    document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    ); // Atualiza o valor das entradas na interface do usuário
    document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    ); // Atualiza o valor das saídas na interface do usuário
    document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    ); // Atualiza o saldo total na interface do usuário
  },

  totalCardColor() {
    // Atualiza a cor do cartão de saldo total com base no valor do saldo
    if (Transaction.total() < 0) {
      // Se o saldo total for negativo
      console.info(
        "Seu Valor Total Esta Negativo: " +
        Utils.formatSimple(Transaction.total())
      ); // Exibe uma mensagem de log indicando que o saldo total é negativo
      CardColor.negative(); // Define a cor do cartão de saldo total como vermelho
    } else {
      // Se o saldo total for positivo
      console.info(
        "Seu Valor Total Esta Positivo: " +
        Utils.formatSimple(Transaction.total())
      ); // Exibe uma mensagem de log indicando que o saldo total é positivo
      CardColor.positive(); // Define a cor do cartão de saldo total como verde
    }
  },

  clearTransactions() {
    // Remove todas as transações da interface do usuário
    DOM.transactionsContainer.innerHTML = ""; // Define o conteúdo HTML do container de transações como vazio
  },
};

const Utils = {
  // Funções utilitárias para formatação de valores
  formatCurrency(value) {
    // Formata um valor como uma moeda
    const signal = Number(value) < 0 ? "-&nbsp;" : "+&nbsp;"; // Define o sinal (+ ou -) com base no valor

    value = String(value).replace(/\D/g, ""); // Remove todos os caracteres não numéricos do valor
    value = Number(value) / 100; // Converte o valor para centavos
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }); // Formata o valor como uma moeda brasileira

    return signal + value; // Retorna o valor formatado como uma moeda com o sinal adequado
  },

  formatAmount(value) {
    // Formata um valor numérico para representar uma quantidade de dinheiro
    value = value * 100; // Converte o valor para centavos
    return Math.round(value); // Retorna o valor arredondado para o número inteiro mais próximo
  },

  formatSimple(value) {
    // Formata um valor como uma moeda sem o símbolo da moeda
    const signal = Number(value) < 0 ? "- " : "+ "; // Define o sinal (+ ou -) com base no valor

    value = String(value).replace(/\D/g, ""); // Remove todos os caracteres não numéricos do valor
    value = Number(value) / 100; // Converte o valor para centavos
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }); // Formata o valor como uma moeda brasileira

    return signal + value; // Retorna o valor formatado como uma moeda com o sinal adequado
  },

  formatDate(date) {
    // Formata uma data no formato 'dd/mm/aaaa'
    const splittedDate = date.split("-"); // Divide a data em partes (ano, mês, dia)
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`; // Retorna a data formatada como 'dia/mês/ano'
  },
};

const Form = {
  // Objeto responsável por lidar com o formulário de adição de transações
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    // Obtém os valores dos campos do formulário
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }; // Retorna um objeto contendo os valores dos campos do formulário
  },

  validateFields() {
    // Valida os campos do formulário
    const { description, amount, date } = Form.getValues(); // Obtém os valores dos campos do formulário

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      // Se algum campo estiver vazio
      throw new Error("Por favor, preencha todos os campos!"); // Lança um erro indicando que todos os campos devem ser preenchidos
    }
  },

  formatValues() {
    // Formata os valores dos campos do formulário
    let { description, amount, date } = Form.getValues(); // Obtém os valores dos campos do formulário

    amount = Utils.formatAmount(amount); // Formata o valor da transação como uma quantidade de dinheiro
    date = Utils.formatDate(date); // Formata a data da transação

    return {
      description,
      amount,
      date,
    }; // Retorna um objeto contendo os valores formatados
  },

  saveTransaction(transaction) {
    // Salva uma transação
    Transaction.add(transaction); // Adiciona a transação ao array de transações
  },

  clearFields() {
    // Limpa os campos do formulário
    Form.description.value = ""; // Limpa o campo de descrição
    Form.amount.value = ""; // Limpa o campo de valor
    Form.date.value = ""; // Limpa o campo de data
  },

  submit(event) {
    // Submete o formulário de adição de transações
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    try {
      Form.validateFields(); // Valida os campos do formulário
      const transaction = Form.formatValues(); // Formata os valores dos campos do formulário
      Form.saveTransaction(transaction); // Salva a transação
      Form.clearFields(); // Limpa os campos do formulário

      Modal.close(); // Fecha o modal de adição de transações
    } catch (error) {
      console.log(error.message); // Exibe uma mensagem de aviso no console em caso de erro
      // toastError(error.message); // Exibe um toast de erro com a mensagem de erro
    }
  },
};

const App = {
  // Objeto responsável por inicializar a aplicação
  init() {
    Transaction.all.forEach(DOM.addTransaction); // Adiciona todas as transações à interface do usuário
    DOM.updateBalance(); // Atualiza o saldo total e as entradas e saídas na interface do usuário
    DOM.totalCardColor(); // Atualiza a cor do cartão de saldo total na interface do usuário

    Storage.set(Transaction.all); // Salva todas as transações no localStorage
  },

  reload() {
    // Recarrega a aplicação
    DOM.clearTransactions(); // Remove todas as transações da interface do usuário
    App.init(); // Inicializa a aplicação novamente
  },
};

App.init(); // Inicializa a aplicação quando o script é carregado

document.addEventListener("DOMContentLoaded", function (event) {

  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  // Your code to run since DOM is loaded and ready
});