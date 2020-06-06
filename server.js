if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(methodOverride('_method'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.listen(process.env.PORT || 3000);
