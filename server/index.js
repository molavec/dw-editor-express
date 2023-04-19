/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DatabaseManager = require('./lib/DatabaseManager');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  // origin: ['http://localhost:5173']
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('DigitalWriter.<span style="color: red;">ART</span> on Express JS!');
})

app.get('/text', async (req, res) => {
  const dbm = await DatabaseManager.getInstance();
  const result = await dbm.load();
  res.send(result);   
})

app.post('/text', async (req, res) => {
  console.log(req.body);      // your JSON
  const data = req.body;
  const dbm = await DatabaseManager.getInstance();
  await dbm.save(data.title, data.content);
  res.send(data);    // echo the result back
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
