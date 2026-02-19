const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/Padthai', (req, res) => {
  res.sendFile(__dirname + '/views/Padthai.html');
});

app.get('/caesarsalad', (req, res) => {
  res.sendFile(__dirname + '/views/caesarsalad.html');
});

app.get('/sushi', (req, res) => {
  res.sendFile(__dirname + '/views/sushi.html');
});

app.get('/tacos', (req, res) => {
  res.sendFile(__dirname + '/views/tacos.html');
});

app.get('/butterchicken', (req, res) => {
  res.sendFile(__dirname + '/views/butterchicken.html');
});

app.get('/falafelwrap', (req, res) => {
  res.sendFile(__dirname + '/views/falafelwrap.html');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});