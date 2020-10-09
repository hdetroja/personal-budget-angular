const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let monthly_budget = require('./budget.json')

app.get('/budget', (req, res) => {
    res.send(monthly_budget);
});
app.get('/budget', (req,res) => {
    res.json(monthly_budget);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port)
});