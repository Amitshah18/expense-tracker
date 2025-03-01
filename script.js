document.addEventListener("DOMContentLoaded", loadTransactions);

function addTransaction() {
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (amount === "" || description === "") {
        alert("Please enter both amount and description.");
        return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({ amount, description, type, category });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";

    loadTransactions();
}

function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let transactionList = document.getElementById("transactionList");
    let totalIncome = document.getElementById("totalIncome");
    let totalExpense = document.getElementById("totalExpense");

    transactionList.innerHTML = "";
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction, index) => {
        let li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${transaction.type}`;
        li.innerHTML = `${transaction.description} - ₹${transaction.amount} (${transaction.category}) 
                        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">❌</button>`;

        if (transaction.type === "income") {
            incomeTotal += parseFloat(transaction.amount);
        } else {
            expenseTotal += parseFloat(transaction.amount);
        }

        transactionList.appendChild(li);
    });

    totalIncome.innerText = incomeTotal;
    totalExpense.innerText = expenseTotal;
}

function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    loadTransactions();
}
