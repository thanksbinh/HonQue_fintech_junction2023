var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "fintech_money_transfer"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;