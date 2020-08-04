/*  FOR RUNNING LOCAL:
    node driver.js (must have mongodb insalled)
*/
const dbConfig = require('./db/dbConfig');
const express = require('express');
const app = express();
const port = 3000;

dbConfig.startDBConnection();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })