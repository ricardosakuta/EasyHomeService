var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var setorDeAtividade = require('./routes/setorDeAtividade')
var buscar = require('./routes/buscar')
var cidade = require('./routes/cidade')
var funcionario = require('./routes/funcionario')
var historico = require('./routes/historico')
var servico = require('./routes/servico')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/api/users', usersRouter);
app.use('/api/setordeatividade', setorDeAtividade);
app.use('/api/buscar', buscar)
app.use('/api/cidade', cidade)
app.use('/api/funcionario', funcionario)
app.use('/api/historico', historico)
app.use('/api/servico', servico)

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

module.exports = app;