/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const cors = require('cors');

const DatabaseManager = require('./lib/DatabaseManager');

const app = express();
const port = 3000;


// Add this line to serve our index.html page
app.use(express.static('public'));

app.use(bodyParser.json());

// Use the express-fileupload middleware
app.use(fileUpload());

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

app.post('/avatar', (req, res) => {
  console.log('req', req);
  // Get the file that was set to our field named "image"
  const { file } = req.files;

  // If no image submitted, exit
  if (!file) return res.sendStatus(400);
  
  // If does not have image mime type prevent from uploading
  //if (/^image/.test(image.mimetype)) return res.sendStatus(400);


  // Move the uploaded image to our upload folder
  file.mv(__dirname + '/public/uploads/' + file.name);

  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
