const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const AuthController = require('./server/controllers/AuthController')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use(express.json());

app.use(AuthController)

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;