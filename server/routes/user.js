import { Router } from 'express';

var router = Router();

/* users management */
router.post('/avatar', (req, res) => {
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

export default router;