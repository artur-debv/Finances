
function toastError() {
  const toast = document.getElementById('toast');

  // Mostra o toast
  toast.style.display = 'block';

  // Esconde o toast após 3 segundos (ajuste conforme necessário)
 
}


const Modal = {
 
  open() {
    document.querySelector(".modal-overlay").classList.add("active"); 
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active"); 
  },
};

const CardColor = {
 
  positive() {
    document.querySelector(".card.total").classList.remove("negative"); 
    document.querySelector(".card.total").classList.add("positive"); 
  },
  negative() {
    document.querySelector(".card.total").classList.remove("positive"); 
    document.querySelector(".card.total").classList.add("negative"); 
  },
};

const Storage = {

  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []; 
  },
  set(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    ); 
  },
};

const Transaction = {
  all: Storage.get(),
  add(transaction) {
    this.all.push(transaction); 
    App.reload(); 
  },
  remove(index) {
    Transaction.all.splice(index, 1); 

    App.reload(); 
  },
  incomes() {
    
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount; 
      }
    });
    return income; 
  },
  expenses() {
    
    let expense = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense; 
  },
  total() {
    
    return Transaction.incomes() + Transaction.expenses(); 
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"), 

  addTransaction(transactions, index) {
   
    const tr = document.createElement("tr"); 
    tr.innerHTML = DOM.innerHTMLTransaction(transactions, index); 
    tr.dataset.index = index; 

    DOM.transactionsContainer.prepend(tr); 
  },

  innerHTMLTransaction(transactions, index) {
   
    const CSSclass = transactions.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transactions.amount); 
    const html = `
        <td class="description">${transactions.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transactions.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" class="remove" alt="Remover Transação">
        </td>
        `;
    return html; 
  },

  updateBalance() {
    
    document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    ); 
    document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    ); 
    document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    ); 
  },

  totalCardColor() {
  
    if (Transaction.total() < 0) {
   
      console.info(
        "Seu Valor Total Esta Negativo: " +
        Utils.formatSimple(Transaction.total())
      ); 
      CardColor.negative(); 
    } else {
      
      console.info(
        "Seu Valor Total Esta Positivo: " +
        Utils.formatSimple(Transaction.total())
      );
      CardColor.positive(); 
    }
  },

  clearTransactions() {
   
    DOM.transactionsContainer.innerHTML = ""; 
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

  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
  
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }; 
  },

  validateFields() {
    
    const { description, amount, date } = Form.getValues(); 

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
     
      throw new Error("Por favor, preencha todos os campos!");
    }
  },

  formatValues() {

    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  saveTransaction(transaction) {
   
    Transaction.add(transaction);
  },

  clearFields() {

    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    
    event.preventDefault(); 
    try {
      Form.validateFields(); 
      const transaction = Form.formatValues(); 
      Form.saveTransaction(transaction); 
      Form.clearFields(); 

      Modal.close(); 
    } catch (error) {
      console.log(error.message); 
      toastError(); 
    }
  },
};

const App = {
  
  init() {
    Transaction.all.forEach(DOM.addTransaction); 
    DOM.updateBalance(); 
    DOM.totalCardColor(); 

    Storage.set(Transaction.all);
  },

  reload() {
   
    DOM.clearTransactions(); 
    App.init(); 
  },
};

App.init();

document.addEventListener("DOMContentLoaded", function (event) {

  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

   
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
       
        nav.classList.toggle('show')
       
        toggle.classList.toggle('bx-x')
      
        bodypd.classList.toggle('body-pd')
        
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

  
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  
});