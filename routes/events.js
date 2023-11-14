/* 
    Rutas de Events
    host + /api/events
*/

const {Router} = require('express');
const router = Router();

const {validarJWT} = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

// CUALQUIER PETICION QUE SE ENCUENTRE
// ABAJO DE ESTO VA A TENER QUE TENER SU TOKEN
router.use(validarJWT);

// Todas tienen que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos);

// Crear un evento evento
router.post('/', crearEvento);

// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router;