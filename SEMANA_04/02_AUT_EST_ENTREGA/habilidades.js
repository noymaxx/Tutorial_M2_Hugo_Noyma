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

// Retorna todos registros (é o R do CRUD - Read)
app.get("/habilidades", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM Habilidades ORDER BY ID ASC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post("/insereHabilidades", urlencodedParser, (req, res) => {
  const db = new sqlite3.Database(DBPATH); // Abre o banco
  const nome = req.body.Nome;
  const nivel = req.body.Nível;
  if (!nome || !nivel) {
    return res.status(400).send("Nome e Nível são obrigatórios");
  }
  const sql = "INSERT INTO Habilidades (Nome, Nível) VALUES (?, ?)";
  db.run(sql, [nome, nivel], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao inserir habilidade");
    }
    res.status(201).json({ message: "Habilidade inserida com sucesso" });
  });
  db.close((err) => {
    if (err) {
      console.error(err);
    }
  }); // Fecha o banco de forma assíncrona
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get("/atualizaHabilidades", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "SELECT * FROM Habilidades WHERE Nome=" + req.query.Nome;
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post("/atualizaHabilidades", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "UPDATE Habilidades SET Nome='" + req.body.Nome + "', Nível = '" + req.body.Nível + "'";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.end();
  });
  res.write('<p>HABILIDADE ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get("/removeHabilidades", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "DELETE FROM Habilidades WHERE userNome='" + req.query.Nome + "'";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>HABILIDADE REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
