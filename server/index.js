/* eslint-disable no-undef */
const express = require('express');
bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let text = null;

app.get('/', (req, res) => {
  res.send('DigitalWriter.<span style="color: red;">ART</span> on Express JS!');
})

app.post('/load', (req, res) => {
  res.send(JSON.stringify(text));    // echo the result back
})

app.post('/save', (req, res) => {
  console.log(req.body);      // your JSON
  text = JSON.parse(req.body);
  res.send(req.body);    // echo the result back
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
