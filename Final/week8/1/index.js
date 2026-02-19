const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');
const { escape } = require('querystring');

// static resourse & template engine
app.get('/', (req, res) => {
    const sql = `CREATE TABLE if not exists users(
    id int primary key,
    username varchar(20),
    password varchar(20),
    email varchar(30),
    firstname varchar(30),
    lastname varchar(30),
    age int,
    address varchar(100),
    phone varchar(100)
    )`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
    });

    const sqldata = `insert ignore into users
    VALUES
    (1,'somchai','1234','somchai.j@email.com','Somchai','Jaidee',25,'Bangkok','0812345678'),
    (2,'anna.k','1234','anna.k@email.com','Anna','Kim',28,'Chiang Mai','0823456789'),
    (3,'michael.t','1234','michael.t@email.com','Michael','Tan',30,'Phuket','0834567890'),
    (4,'suda.p','1234','suda.p@email.com','Suda','Phrom',22,'Khon Kaen','0845678901'),
    (5,'daniel.w','1234','daniel.w@email.com','Daniel','Wong',35,'Pattaya','0856789012'),
    (6,'kanya.s','1234','kanya.s@email.com','Kanya','Sriwan',27,'Ayutthaya','0867890123'),
    (7,'james.l','1234','james.l@email.com','James','Lee',31,'Udon Thani','0878901234'),
    (8,'malee.t','1234','malee.t@email.com','Malee','Thongchai',29,'Nakhon Pathom','0889012345'),
    (9,'david.c','1234','david.c@email.com','David','Chen',26,'Hat Yai','0890123456'),
    (10,'pimchanok.r','1234','pimchanok.r@email.com','Pimchanok','Rattanakul',33,'Rayong','0801234567')
    `

    conn.query(sqldata, function (err, result){
        if (err) throw err;
        console.log("data already exists");
    })

    const showdata = "select * from users";
    conn.query(showdata, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('show', { data : result})
    });
});

app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true }));

// routing 



app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 