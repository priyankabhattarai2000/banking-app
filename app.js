const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

let data = JSON.parse(fs.readFileSync('accounts.json'));

// Create Account
app.post('/account', (req, res) => {
    const { name } = req.body;

    const account = {
        id: Date.now(),
        name,
        balance: 0,
        transactions: []
    };

    data.push(account);
    saveData();

    res.json(account);
});

// Deposit
app.post('/deposit', (req, res) => {
    const { id, amount } = req.body;
    const acc = data.find(a => a.id == id);

    if (!acc) return res.status(404).send("Account not found");

    acc.balance += amount;
    acc.transactions.push(`Deposited ${amount}`);
    saveData();

    res.json(acc);
});

// Withdraw
app.post('/withdraw', (req, res) => {
    const { id, amount } = req.body;
    const acc = data.find(a => a.id == id);

    if (!acc) return res.status(404).send("Account not found");
    if (acc.balance < amount) return res.send("Insufficient balance");

    acc.balance -= amount;
    acc.transactions.push(`Withdrew ${amount}`);
    saveData();

    res.json(acc);
});

// Check Balance
app.get('/balance/:id', (req, res) => {
    const acc = data.find(a => a.id == req.params.id);

    if (!acc) return res.status(404).send("Account not found");

    res.json({ balance: acc.balance });
});

function saveData() {
    fs.writeFileSync('accounts.json', JSON.stringify(data, null, 2));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});