const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const forest = require('forest-express-sequelize');
const { Sequelize, Model, DataTypes } = require('sequelize');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
var initModels = require("./models/init-models");
// const connection = new Sequelize('mysql://root:password@localhost:3306/controledevendas',);

const connection = new Sequelize('controledevendas', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});
var models = initModels(connection);

(async () => {
  try{
    console.log(await models.tabela_de_precos.findAll())
  }catch(e){
    console.log(e)
  }
})()


// try {
//   connection.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('common'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cors({
  origin: [/\.forestadmin\.com$/],
  allowedHeaders: ['Authorization', 'X-Requested-With', 'Content-Type','forest-context-url'],
  credentials: true
}));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
 
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

forest.init({
 envSecret: process.env.FOREST_ENV_SECRET||'d418ca0f582af176af72d9e229a29b23ff0d4a93aa4d292d0f6029749ba4730e',
 authSecret: process.env.FOREST_AUTH_SECRET||'7e8826974b0d973ee9b6def02cd4ac06a9fb257fd675f5c6',
 objectMapping: Sequelize,
 connections: { default: connection },
//  schemaDir:'controledevendas'
}).then((FAMiddleware) => {
  console.log('FAMiddleware')
 app.use(FAMiddleware);
});



module.exports = app;
