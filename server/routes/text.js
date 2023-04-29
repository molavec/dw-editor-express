import { Router } from 'express';
import TextManager from '../lib/TextManager.js';

var router = Router();

router.get('/:id', async (req, res) => {
  const tm = new TextManager();
  const result = await tm.getById(req.params.id);
  res.send(result);   
});

router.get('/list/:userId', async (req, res) => {
  const tm = new TextManager();
  const result = await tm.getListByUserId(req.params.userId);
  res.send(result);
});

router.post('/', async (req, res) => {
  console.log(req.body);      // your JSON
  const data = req.body;
  const tm = new TextManager();
  await tm.create(data.title, data.content, data.userId);
  res.send(data);    // echo the result back
});



export default router;