const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let monthly_budget = {
    "myBudget": [
        {
    "title": "Eat out",
    "budget": 25
},
{
    "title": "Rent",
    "budget": 375
},
{
    "title": "Grocery",
    "budget": 110
},
{
    "title": "Car Insurance",
    "budget": 200
},
{
    "title": "Water,Electricity Bills",
    "budget": 100
},
{
    "title": "Student Loan",
    "budget": 300
},
{
    "title": "Mobile Plan",
    "budget": 60
},
{
    "title": "Misc",
    "budget": 50
},]
};


app.get('/budget', (req,res) => {
    res.json(monthly_budget);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port)
});