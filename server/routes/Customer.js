const express = require("express");
const router = express.Router();
const connection = require('../db_connection');

router.post('/', async (req, res) => {
  const { id, displayName, avatarUrl, email, phoneNumber, cardId } = req.body;
  const insertQuery = `INSERT INTO customer (id, displayName, avatarUrl, email, phoneNumber, cardId) VALUES (? ,? ,? ,? ,? ,?)`;
  const values = [id, displayName, avatarUrl, email, phoneNumber, cardId];

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