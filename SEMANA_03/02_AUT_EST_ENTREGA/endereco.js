app.get("/endereco", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM Endereço ORDER BY ID ASC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});
