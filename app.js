const fs = require('fs');

let data = JSON.parse(fs.readFileSync('accounts.json'));

function createAccount(name) {
    const account = {
        id: Date.now(),
        name,
        balance: 0,
        transactions: []
    };
    data.push(account);
    saveData();
    console.log("Account created:", account);
}

function deposit(id, amount) {
    let acc = data.find(a => a.id === id);
    if (!acc) return console.log("Account not found");

    acc.balance += amount;
    acc.transactions.push(`Deposited ${amount}`);
    saveData();
}

function withdraw(id, amount) {
    let acc = data.find(a => a.id === id);
    if (!acc) return console.log("Account not found");

    if (acc.balance < amount) {
        return console.log("Insufficient balance");
    }

    acc.balance -= amount;
    acc.transactions.push(`Withdrew ${amount}`);
    saveData();
}

function checkBalance(id) {
    let acc = data.find(a => a.id === id);
    console.log(acc ? acc.balance : "Account not found");
}

function saveData() {
    fs.writeFileSync('accounts.json', JSON.stringify(data, null, 2));
}

// Example usage
createAccount("Priyanka");