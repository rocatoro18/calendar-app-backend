const express = require('express');
require('dotenv').config();

//console.log(process.env);

// CREAR EL SERVIDOR DE EXPRESS
const app = express();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// LECTURA Y PARSEO DEL BODY
app.use(express.json());

// RUTAS
/*
app.get('/',(req, res)=>{
    //console.log('Se requiere el /');
    res.json({
        ok: true
    });
});
*/
// RUTAS
// TODO: AUTH // CREAR, LOGIN, RENEW
app.use('/api/auth',require('./routes/auth'));
// TODO: CRUD: EVENTOS


// ESCUCHAR PETICIONES
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});