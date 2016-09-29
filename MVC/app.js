//Imports dos modulos 
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var load          = require('express-load');
var mongoose      = require('mongoose');
var flash         = require('express-flash');
var session       = require('session');
var moment        = require('moment'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(flash());

//helpers
//isto faz com que o modulo moment fique disponivel para todo o projeto
//fonte: http://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views
app.locals.moment = moment; 

//so pode ser executado se o express-load estiver instalado
//deve estar antes da inicialização do app
load('models').then('controllers').then('routes').into(app);

// Conexao com o MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MVC', function(err){
  if(err){
    console.log("Erro ao conectar ao banco: " + err)
  }else{
    console.log("Conexão estabelecida com sucesso !")
  }
})

//Iniciando a app
app.listen(3000, function () {
  console.log('Servidor rodando na porta 3000');
});

//ERROS
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
