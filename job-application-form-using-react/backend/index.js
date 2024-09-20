const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Route } = require('react-router-dom');
const Authrouter = require('./Routes/Authrouter');


require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/Auth',Authrouter)
app.use('/products',productsrouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
