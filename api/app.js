var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var setor = require('./routers/setor.routes')
var buscar = require('./routers/buscar.routes')
var cidade = require('./routers/cidade.routes')
var usuario = require('./routers/usuario.routes')
var historico = require('./routers/historico.routes')
var servico = require('./routers/servico.routes')
var authGoogle = require('./routers/authGoogle.routes')
var empresa = require('./routers/empresa.routes')
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(session({
	secret: '2C44-4D44-WppQ38S',
	resave: true,
	saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/api/setores', setor);
app.use('/api/buscar', buscar);
app.use('/api/cidades', cidade);
app.use('/api/usuario', usuario);
app.use('/api/historicos', historico);
app.use('/api/servicos', servico);
app.use('/api/auth/google', authGoogle);
app.use('/api/empresas', empresa);

// catch 404 and forward to error handler
app.use(function (req, res) {
	res.status(404).json({ message: "Nenhum registro foi encontrado." })
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;