const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    const {song,artist,album,year,genre,album_cover } = req.query;
    const data = "select * from songs"
    conn.query(data, [song,artist,album,year,genre,album_cover], function (err, results){
        if (err) throw err;
        res.render('home', {data : results })
    })
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 