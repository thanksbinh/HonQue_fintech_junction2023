const express = require("express");
const router = express.Router();
const connection = require('../db_connection');

router.post('/', async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  const insertQuery = `INSERT INTO transaction_history (senderId, receiverId, amount) VALUES (? ,? , ?)`;
  const values = [senderId, receiverId, amount];

  try {
    connection.query(insertQuery, values, (error, results, fields) => {
      if (error) throw error;
      res.send('Data inserted successfully!');
    });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;