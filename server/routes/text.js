import { Router } from 'express';
import TextManager from '../lib/TextManager.js';

var router = Router();

router.get('/', async (req, res) => {
  const tm = new TextManager();
  const result = await tm.load();
  res.send(result);   
});

router.post('/', async (req, res) => {
  console.log(req.body);      // your JSON
  const data = req.body;
  const tm = new TextManager();
  await tm.save(data.title, data.content);
  res.send(data);    // echo the result back
});


export default router;