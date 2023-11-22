const {response} = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response ) => {

    // ESTO SE HACE GRACIAS A MONGOOSE
    // AQUI TAMBIEN SE PUEDEN HACER PAGINACIONES
    // POPULATE = LLENAR LOS DATOS DEL USUARIO
    const eventos = await Evento.find().populate('user','name');

    res.status(200).json({
        ok: true,
        eventos
    });

}

const crearEvento = async(req, res = response) => {

    // NUEVA INSTANCIA DEL MODELO EVENTO,
    // EL CUAL YA ESTA LISTO PARA TRABAJAR
    const evento = new Evento(req.body);

    try {

        // COLOCAR EL ID DEL USUARIO AL EVENTO
        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarEvento = async(req, res = response) => {

    // TOMAR ID QUE VIENE POR EL URL
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        // VERIFICAR SI EL EVENTO EXISTE
        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // VERIFICAR QUE LA PERSONA QUE CREO EL EVENTO
        // SEA LA UNICA QUE LO PUEDE ACTUALIZAR
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }
        
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // DEVOLVER EVENTO SIEMPRE ACTUALIZADO
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async(req, res = response) => {
// TOMAR ID QUE VIENE POR EL URL
const eventoId = req.params.id;
const uid = req.uid;

try {
    
    // VERIFICAR SI EL EVENTO EXISTE
    const evento = await Evento.findById(eventoId);

    if(!evento){
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe por ese id'
        });
    }

    // VERIFICAR QUE LA PERSONA QUE CREO EL EVENTO
    // SEA LA UNICA QUE LO PUEDE ACTUALIZAR
    if(evento.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de eliminar este evento'
        });
    }
    

    // BORRAR EVENTO
    // TAMBIEN SE PODRIA ENVIAR LA REFERENCIA AL VIEJO
    // DOCUMENTO PARA SABER CUAL SE BORRO
    await Evento.findByIdAndDelete(eventoId);

    res.status(200).json({
        ok: true
    })

    } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
