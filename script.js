let transactions = [];
let balance = 0;

// Load transactions from local storage
if (localStorage.getItem('transactions')) {
    transactions = JSON.parse(localStorage.getItem('transactions'));
    updateTransactionsList();
    updateBalance();
}

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description.trim() === '' || isNaN(amount)) {
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateTransactionsList();
    updateBalance();

    // Save transactions to local storage
    saveTransactionsToLocalStorage();

    // Reset input fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'Select Type';
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateTransactionsList();
    updateBalance();

    // Save transactions to local storage
    saveTransactionsToLocalStorage();
}

function editTransaction(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (!transaction) {
        return;
    }

    const newAmount = prompt('Enter the new amount:');
    if (newAmount === null || newAmount.trim() === '') {
        return;
    }

    transaction.amount = parseFloat(newAmount);
    updateTransactionsList();
    updateBalance();

    // Save transactions to local storage
    saveTransactionsToLocalStorage();
}



function updateTransactionsList() {
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'}Rs.${transaction.amount.toFixed(2)}</span>
            <button onclick="editTransaction(${transaction.id})">Edit</button>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        transactionsList.appendChild(li);
    });
}

function updateBalance() {
    balance = transactions.reduce((total, transaction) => {
        return total + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);

    document.getElementById('balance-amount').textContent = `Rs.${balance.toFixed(2)}`;
}

function saveTransactionsToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
