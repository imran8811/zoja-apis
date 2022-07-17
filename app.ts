var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var mongooseConnect = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const MongoStore = require('connect-mongo');

mongooseConnect.connect('mongodb://imran8811:Piyar1dafa%21%40%23@pkapparel-shard-00-02.6x7jk.mongodb.net:27017/myshadi?ssl=true&replicaSet=atlas-jmz7e0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongooseConnect.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(cors());

var indexRouter = require('./routes/index.routes.ts');
var userRouter = require('./routes/user.routes.ts');
var profileRouter = require('./routes/profile.routes.ts');
var favouriteRouter = require('./routes/favourite.routes.ts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/favourite', favouriteRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3003);

module.exports = app;
