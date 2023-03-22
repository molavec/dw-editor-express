/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: ['http://localhost:5173']
}));

let text = null;

app.get('/', (req, res) => {
  res.send('DigitalWriter.<span style="color: red;">ART</span> on Express JS!');
})

app.get('/load', (req, res) => {
  res.send(text);    // echo the result back
})

app.post('/save', (req, res) => {
  console.log(req.body);      // your JSON
  text = req.body;
  res.send(text);    // echo the result back
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
