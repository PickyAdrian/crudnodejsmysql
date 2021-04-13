const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const customerRoutes = require('./routes/customer');
const { dirname } = require('path');
const { urlencoded } = require('express');

//settings
app.set('port', process.env.PORT || 3000); //para ver si el so tiene un puerto asignado
app.set('view engine', 'ejs'); //para usar ejs como motor de plantillas
app.set('views', path.join(__dirname, 'views'));

//middlewares son funciones
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'password+',
    port: 3306,
    database: 'crudnodejs'

},'single'));

app.use(express.urlencoded({extended: false}))

//routes

app.use('/', customerRoutes);

//statics files
app.use(express.static(path.join(__dirname, 'public')));

// empezar el servidor
app.listen(app.get('port'), () =>{
  console.log('Server en puerto 3000')
})