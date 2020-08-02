// for running local
// brew services start mongodb-community@4.4
// brew services stop mongodb-community
const dbConfig = require('./db/dbConfig');
const express = require('express');
const app = express();
const port = 3000;

dbConfig.startDBConnection();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })