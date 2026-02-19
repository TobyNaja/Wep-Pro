const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.set('view engine', 'ejs')

const db = new sqlite3.Database('./userdata.db', (err) => {
    if (err) console.error(err.message);
    console.log('connected to userdata.db')
});

app.get('/', (req, res) =>{
    db.all("select * from users", [], (err, rows) => {
        if (err){
            res.status(500).send(err.message);
            return;
        }
        res.render('home', {users : rows})
    })
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const sql = "select * from users where id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('user', { user: row });
    });

})


app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});