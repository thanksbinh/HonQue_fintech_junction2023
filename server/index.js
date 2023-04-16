const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const askRouter = require('./routes/Ask');
app.use('/ask', askRouter);

const customerRouter = require('./routes/Customer');
app.use('/customer', customerRouter);

const cardRouter = require('./routes/Card');
app.use('/card', cardRouter);

const customerGroupRouter = require('./routes/CustomerGroup');
app.use('/customerGroup', customerGroupRouter);

const transactionHistoryRouter = require('./routes/TransactionHistory');
app.use('/transactionHistory', transactionHistoryRouter);

const transactionRouter = require('./routes/Transaction');
app.use('/transaction', transactionRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));