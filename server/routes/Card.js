const express = require("express");
const router = express.Router();
const connection = require('../db_connection');

router.post('/', async (req, res) => {
  const insertQuery = `INSERT INTO card (balance) VALUES (?)`;
  const values = [0];

  try {
    connection.query(insertQuery, values, (error, results, fields) => {
      if (error) throw error;
      const id = results.insertId;
      res.send({ id });
    });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;