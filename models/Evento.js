const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        // ESTO INDICA A MONGOOSE QUE VA A SER UNA
        // REFERENCIA
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

// AQUI PUEDO ESPECIFICAR COMO QUIERO QUE SE 
// SERIALIZE O DIFERENTES CONFIGURACIONES ADICIONALES
// COMO POR EJEMPLO CAMBIAR EL _ID

// ESTO SOLO ES UNA MODIFICACION A LA HORA DE VER LA DATA
// NO AFECTA A LA BASE DE DATOS
EventoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento',EventoSchema);