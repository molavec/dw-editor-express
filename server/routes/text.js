import { Router } from 'express';
import DatabaseManager from '../lib/DatabaseManager.js';

var router = Router();

router.get('/', async (req, res) => {
  const dbm = await DatabaseManager.getInstance();
  const result = await dbm.load();
  res.send(result);   
});

router.post('/', async (req, res) => {
  console.log(req.body);      // your JSON
  const data = req.body;
  const dbm = await DatabaseManager.getInstance();
  await dbm.save(data.title, data.content);
  res.send(data);    // echo the result back
});


export default router;