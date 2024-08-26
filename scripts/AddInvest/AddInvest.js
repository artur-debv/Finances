const Modal = {
  open() {
      document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
      document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  get() {
      const data = JSON.parse(localStorage.getItem("dev.financesss:investments")) || [];
      console.log("Getting from LocalStorage:", data);
      return data;
  },
  set(transactions) {
      localStorage.setItem("dev.financesss:investments", JSON.stringify(transactions));
      console.log("Setting to LocalStorage:", transactions);
  },
};

const Transaction = {
  all: Storage.get(),
  add(transaction) {
      this.all.push(transaction);
      Storage.set(this.all);
      App.reload();
  },
  remove(index) {
      this.all.splice(index, 1);
      Storage.set(this.all);
      App.reload();
  },
  incomes() {
      let income = 0;
      this.all.forEach((transaction) => {
          if (transaction.amount > 0) {
              income += transaction.amount;
          }
      });
      return income;
  },
  expenses() {
      let expense = 0;
      this.all.forEach((transaction) => {
          if (transaction.amount < 0) {
              expense += transaction.amount;
          }
      });
      return expense;
  },
  total() {
      return this.incomes() + this.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  addTransaction(transaction, index) {
      console.log("Adding transaction to DOM:", transaction, index); // Log para debug
      const tr = document.createElement("tr");
      tr.innerHTML = this.innerHTMLTransaction(transaction, index);
      tr.dataset.index = index;
      this.transactionsContainer.prepend(tr);
  },
  innerHTMLTransaction(transaction, index) {
      const html = `
          <td class="tipoInvestimento">${transaction.tipoInvestimento}</td>
          <td class="date">${transaction.date}</td>
          <td>
              <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" class="remove" alt="Remover Transação">
          </td>
      `;
      return html;
  },
  clearTransactions() {
      console.log("Clearing transactions from DOM"); // Log para debug
      this.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatCurrency(value) {
      const signal = Number(value) < 0 ? "-&nbsp;" : "+&nbsp;";
      value = String(value).replace(/\D/g, "");
      value = Number(value) / 100;
      value = value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
      });
      return signal + value;
  },
  formatAmount(value) {
      value = value * 100;
      return Math.round(value);
  },
  formatSimple(value) {
      const signal = Number(value) < 0 ? "- " : "+ ";
      value = String(value).replace(/\D/g, "");
      value = Number(value) / 100;
      value = value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
      });
      return signal + value;
  },
  formatDate(date) {
      const splittedDate = date.split("-");
      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },
};

const Form = {
  tipoInvestimento: document.querySelector("select#tipoInvestimento"),
  date: document.querySelector("input#date"),
  amount: document.querySelector("input#amount"),
  getValues() {
      return {
          tipoInvestimento: this.tipoInvestimento.value,
          date: this.date.value,
          amount: this.amount.value
      };
  },
  validateFields() {
      const { amount, tipoInvestimento, date } = this.getValues();
      if (tipoInvestimento.trim() === "" || date.trim() === "" || amount.trim() === "") {
          throw new Error("Por favor, preencha todos os campos!");
      }
  },
  formatValues() {
      let { amount, tipoInvestimento, date } = this.getValues();
      date = Utils.formatDate(date);
      amount = Utils.formatAmount(amount);
      return { amount, tipoInvestimento, date };
  },
  saveTransaction(transaction) {
      Transaction.add(transaction);
  },
  clearFields() {
      this.tipoInvestimento.value = "";
      this.date.value = "";
      this.amount.value = "";
  },
  submit(event) {
      event.preventDefault();
      try {
          this.validateFields();
          const transaction = this.formatValues();
          this.saveTransaction(transaction);
          this.clearFields();
          Modal.close();
      } catch (error) {
          console.log(error.message);
      }
  },
};

const App = {
  init() {
      console.log("Initializing App with transactions:", Transaction.all); // Log para debug
      Transaction.all.forEach((transaction, index) => {
          DOM.addTransaction(transaction, index);
      });
      Storage.set(Transaction.all);
  },
  reload() {
      DOM.clearTransactions();
      this.init();
  },
};

App.init();

document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId),
          bodypd = document.getElementById(bodyId),
          headerpd = document.getElementById(headerId);

      if (toggle && nav && bodypd && headerpd) {
          toggle.addEventListener('click', () => {
              nav.classList.toggle('show');
              toggle.classList.toggle('bx-x');
              bodypd.classList.toggle('body-pd');
              headerpd.classList.toggle('body-pd');
          });
      }
  };

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

  const linkColor = document.querySelectorAll('.nav_link');
  function colorLink() {
      if (linkColor) {
          linkColor.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
      }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink));
});
