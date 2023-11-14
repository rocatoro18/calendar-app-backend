/* 
    Rutas de Events
    host + /api/events
*/

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

// CUALQUIER PETICION QUE SE ENCUENTRE
// ABAJO DE ESTO VA A TENER QUE TENER SU TOKEN
router.use(validarJWT);

// Todas tienen que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos);

// Crear un evento evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ]
    ,
    crearEvento
);

// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router;