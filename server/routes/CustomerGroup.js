const express = require("express");
const router = express.Router();
const connection = require('../db_connection');

router.post('/', async (req, res) => {
  const { id, chatOwnerId, chatName, cardId } = req.body;
  const insertQuery = `INSERT INTO customer_group (id, chatOwnerId, chatName, cardId) VALUES (? ,? ,? ,?)`;
  const values = [id, chatOwnerId, chatName, cardId];

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