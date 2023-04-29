import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import hbs from 'express-handlebars';

// routes
import text from './routes/text.js';
import user from './routes/user.js';

const app = express();
const port = 3000;

/* static */
app.use(express.static('public'));

/* handlebars */
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

/* JSON */
app.use(express.json());

/* express-fileupload */
app.use(fileUpload());

/* cors */
app.use(cors({
  // origin: ['http://localhost:5173']
  origin: '*',
}));

/* home */
app.get('/', (req, res) => {
  res.render('home');
});

/* text management */
app.use('/text', text);


/* user management */
app.use('/user', user);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
