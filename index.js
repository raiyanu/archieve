const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json())
const tasks = [];
app.get('/', (req, res) => {
    console.log('a request has been initiated!...')
    res.sendFile(__dirname + '/public/index.html');
    console.log('resources has been sent');
});

app.post('/add', (req, res) => {
    task = req.body;
    console.log('task is : ', task);
    tasks.push(task);
    res.json(tasks);
    console.log(tasks);
});
app.listen(6969, () => {
    console.log('a connection has been launched...');
});
