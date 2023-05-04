const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require("sqlite3").verbose();
const curriculo = "/curriculo.db";

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
  var db = new sqlite3.Database(curriculo); // Abre o banco
  var sql = "SELECT * FROM habilidades ORDER BY new_hability COLLATE NOCASE";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post("/inserehabilidades", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(curriculo); // Abre o banco
  sql =
    "INSERT INTO habilidades (new_hability, email, telefone) VALUES ('" +
    req.body.nome +
    "', '" +
    req.body.email +
    "', " +
    req.body.telefone +
    ")";
  console.log(sql);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>habilidades INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
  res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get("/atualizahabilidades", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "SELECT * FROM habilidades WHERE userId=" + req.query.userId;
  console.log(sql);
  var db = new sqlite3.Database(curriculo); // Abre o banco
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post("/atualizahabilidades", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "UPDATE habilidades SET new_hability='" +
    req.body.nome +
    "', email = '" +
    req.body.email +
    "' , telefone='" +
    req.body.telefone +
    "' WHERE userId='" +
    req.body.userId +
    "'";
  console.log(sql);
  var db = new sqlite3.Database(curriculo); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.end();
  });
  res.write('<p>habilidades ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get("/removehabilidades", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "DELETE FROM habilidades WHERE userId='" + req.query.userId + "'";
  console.log(sql);
  var db = new sqlite3.Database(curriculo); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>habilidades REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
