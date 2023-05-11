const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require("sqlite3").verbose();
const DBPATH = "curriculo.db";

const hostname = "127.0.0.1";
const port = 3000;
const app = express();

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

app.get("/formacao", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM Formação ORDER BY ID ASC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});
