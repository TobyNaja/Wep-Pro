const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/cats', (req, res) => {
  res.sendFile(__dirname + '/views/cats.html');
});

app.get('/dogs', (req, res) => {
  res.sendFile(__dirname + '/views/dogs.html');
});

app.get('/birds', (req, res) => {
  res.sendFile(__dirname + '/views/birds.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
