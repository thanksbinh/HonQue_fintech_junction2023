const express = require("express");
const router = express.Router();
const connection = require('../db_connection');

const addHistory = (senderId, receiverId, amount) => {
  const insertQuery = `INSERT INTO transaction_history (senderId, receiverId, amount) VALUES (? ,? , ?)`;
  const values = [senderId, receiverId, amount];

  try {
    connection.query(insertQuery, values, (error, results, fields) => {
      if (error) throw error;
    });
  } catch (err) {
    console.log(err);
  }
}

router.post('/', async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      res.status(500).send({ message: 'Failed to start database transaction.' });
      console.log(err);
      return;
    }

    // Deduct the amount from the sender's account
    connection.query('UPDATE card SET balance = balance - ?  \
      WHERE id = ( SELECT cardId FROM customer WHERE id = ? ) || id = ( SELECT cardId FROM customer_group WHERE id = ? )',
      [amount, senderId, senderId], (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Failed to deduct the amount from the sender account.' });
          connection.rollback();
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Sender account not found or insufficient balance.' });
          connection.rollback();
          return;
        }

        // Add the same amount to the receiver's account
        connection.query('UPDATE card SET balance = balance + ? \
          WHERE id = ( SELECT cardId FROM customer WHERE id = ? ) || id = ( SELECT cardId FROM customer_group WHERE id = ? )',
          [amount, receiverId, receiverId], (err, result) => {
            if (err) {
              res.status(500).send({ message: 'Failed to add the amount to the receiver account.' });
              connection.rollback();
              return;
            }

            if (result.affectedRows === 0) {
              res.status(404).send({ message: 'Receiver account not found.' });
              connection.rollback();
              return;
            }

            // Commit the transaction and destroy the database connection
            connection.commit((err) => {
              if (err) {
                res.status(500).send({ message: 'Failed to commit database transaction.' });
                connection.rollback();
                return;
              }

              res.send({ message: 'Money transferred successfully.' });
              addHistory(senderId, receiverId, amount);
            });
          });
      });
  });
})

module.exports = router;