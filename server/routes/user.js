import { Router } from 'express';
import UserManager from '../lib/UserManager.js';

import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var router = Router();

const um = new UserManager();

router.get('/:id', async (req, res) => {
  const result = await um.getByEmail(req.params.id);
  res.send(result);   
});

router.get('/email/:email', async (req, res) => {
  const result = await um.getByEmail(req.params.email);
  res.send(result);
});

router.post('/register', async (req, res) => {
  //TODO: obtener los parametros del post
  // console.log('req.body', req.body); // your JSON

  // check if email is already registered
  const isEmailExist = await um.getByEmail(req.body.email);
  console.log('isEmailExist', isEmailExist);
  if (isEmailExist) {
    return res.status(400).json({error: 'Email ya registrado'});
  }

  // hash password with bcrypt
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

  //create usuario
  const data = req.body;
  const result = await um.create(
    data.email,
    data.firstname,
    data.lastname,
    data.alias,
    data.image,
    hashedPassword,
  );
  res.send(result);

});

router.post('/login', async (req, res) => {
  //TODO: obtener los parametros del post
  // console.log('req.body', req.body); // your JSON

  // check if email is already registered
  const user = await um.getByEmail(req.body.email);
  
  if (!user) {
    return res.status(400).json({error: 'Usuario no encontrado'});
  }

  // compara la contraseña con la que se envía
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' });
  
  res.send(user);

});

router.put('/avatar', (req, res) => {

  console.log('req.body', req.body);
  // const data = req.body;

  // Get the file that was set to our field named "image"
  const { file } = req.files;

  // If no image submitted, exit
  if (!file) return res.sendStatus(400);
  
  // If does not have image mime type prevent from upl  oading
  //if (/^image/.test(image.mimetype)) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  file.mv(__dirname + '/../public/uploads/' + file.name);

  res.sendStatus(200);
});

export default router;