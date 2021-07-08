const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app =express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'CRUDDataBase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM movie_name";
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    });
});

app.post("/api/insert", (req, res)=>{

    const movie_name =req.body.movie_name;
    const movie_review = req.body.movie_review;

    const sqlInsert = "INSERT INTO movie_name (movie_name,movie_review) VALUES (?,?);"
    db.query(sqlInsert, [movie_name, movie_review], (err,result)=>{
        console.log(result);
    });
});

app.delete("/api/delete/:movie_name", (req, res)=> {
    const name =req.params.movie_name
    const sqlDelete = "DELETE FROM movie_name WHERE movie_name = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res)=> {
    const name =req.body.movie_name
    const review =req.body.movie_review
    const sqlUpdate = "UPDATE movie_name SET movie_review = ? WHERE movie_name = ?";

    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});