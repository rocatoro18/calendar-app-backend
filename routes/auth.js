/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const {Router} = require('express');
//const router = express.Router;
// EJECUTAMOS LA FUNCION
const router = Router();

const {check} = require('express-validator');

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        // CUSTOM MIDDLEWARE
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        // CUSTOM MIDDLEWARE
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;