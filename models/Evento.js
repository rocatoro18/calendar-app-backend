const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        require: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {
        // ESTO INDICA A MONGOOSE QUE VA A SER UNA
        // REFERENCIA
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

module.exports = model('Evento',EventoSchema);