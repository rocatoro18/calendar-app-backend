const {response} = require('express');
const {validationResult} = require('express-validator');

const validarCampos = (req, res = response, next) => {

    // MANEJO DE ERRORES CON EXPRESS-VALIDATOR
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // SI NO HAY NINGUN ERROR LLAMAMOS EL NEXT
    next();

}

module.exports = {
    validarCampos
}