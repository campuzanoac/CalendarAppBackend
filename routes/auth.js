/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = express.Router();


router.post(
    '/register', 
    [ 
        check('name', 'El nombre es obligatorio' ).not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 8 caracteres mínimo').isLength({ min: 8 }),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/', 
    [
        check('email', 'Usuario o contraseña inválidos').isEmail(),
        check('password', 'Usuario o contraseña inválidos').isLength({ min: 8 }),
        validarCampos
    ] , 
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;