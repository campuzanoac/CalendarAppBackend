const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Se crea el servidor
const app = express();

//conexion DB
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public'));

//Lectura del body de las peticiones
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escucha las peticiones
app.listen( process.env.PORT, () => {
    console.log( `Server ready at ${ process.env.PORT }` );
})