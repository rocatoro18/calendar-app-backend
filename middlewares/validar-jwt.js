const {response} = require('express');
const jwt = require('jsonwebtoken');


// EL MIDDLEWARE SE ENCARGA DE VER SI EL TOKEN ES VALIDO O NO
// Y EL CONTROLLER SE ENCARGA DE GENERAR UN NUEVO TOKEN
// Y MANDARLO AL FRONT END
const validarJWT = (req = response, res = response, next) => {

    // x-token headers
    // LEER HEADERS
    const token = req.header('x-token');

    // VALIDAR TOKEN
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        //console.log(payload);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}