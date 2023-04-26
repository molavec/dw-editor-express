import { Router } from 'express';
import UserManager from '../lib/UserManager.js';


var router = Router();

router.get('/:id', async (req, res) => {
  const tm = new UserManager();
  const result = await tm.getByEmail(req.params.id);
  res.send(result);   
});

router.get('/email/:email', async (req, res) => {
  const tm = new UserManager();
  const result = await tm.getByEmail(req.params.email);
  res.send(result);   
});

router.post('/', async (req, res) => {
  const tm = new UserManager();
  //TODO: obtener los parametros del post
  console.log(req.body);      // your JSON
  const data = req.body;
  const result = await tm.create(
    data.email,
    data.firstname,
    data.lastname,
    data.alias,
    data.image,
    data.password,
  );
  res.send(result);   
});

router.put('/avatar', (req, res) => {
  console.log('req', req);
  // Get the file that was set to our field named "image"
  const { file } = req.files;

  // If no image submitted, exit
  if (!file) return res.sendStatus(400);
  
  // If does not have image mime type prevent from upl  oading
  //if (/^image/.test(image.mimetype)) return res.sendStatus(400);


  // Move the uploaded image to our upload folder
  file.mv(__dirname + '/public/uploads/' + file.name);

  res.sendStatus(200);
});

export default router;