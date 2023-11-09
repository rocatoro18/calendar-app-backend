// NECESARIO PARA CONSERVAR EL TIPADO
const {response} = require('express');
const {validationResult} = require('express-validator');
// req, res = express.response PARA MANTENER TIPADO
const crearUsuario = (req, res = response)=>{
    
    const {name, email, password} = req.body;

    // MANEJO DE ERRORES CON EXPRESS-VALIDATOR
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    });
}

const loginUsuario = (req, res = response)=>{
    
    const {email, password} = req.body;

    // MANEJO DE ERRORES CON EXPRESS-VALIDATOR
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}


const revalidarToken  = (req, res = response)=>{
    
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}