const {response} = require('express');

const getEventos = (req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'getEventos'
    });

}

const crearEvento = (req, res = response) => {

    // VERIFICAR QUE TENGA EL EVENTO.
    console.log(req.body);

    res.status(200).json({
        ok: true,
        msg: 'crearEvento'
    });

}

const actualizarEvento = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'actualizarEvento'
    });

}

const eliminarEvento = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'eliminarEvento'
    });

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
