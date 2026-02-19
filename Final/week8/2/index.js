const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');
const { escape } = require('querystring');

// static resourse & template engine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get('/formget', (req, res) => {
    const { username, password, email, firstname, lastname, age, address, phone } = req.query;
    const sql = "select * from users where username = ? or email = ?"
    conn.query(sql,[username , email], function (err,results){
        if (err) throw err;
        console.log(results);

        if (results.length === 0){
            res.redirect("/notfound.html")
            return
        }
        if (results[0].password != password){
            res.redirect("/incorrectpassword.html")
            return
        }
        res.render("show", { data : results})
        
    })
})

app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true }));

// routing 



app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 