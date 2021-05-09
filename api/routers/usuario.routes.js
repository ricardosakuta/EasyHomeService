var express = require('express');
var router = express.Router();
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuario.controller')

/* GET users listing. */
router.get('/email/:email', usuarioController.getByEmail);

router.put('/perfil/:id', usuarioController.update);

router.post('/', 
[
    check('email').isEmail(),
    check('nome').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
    check('senha').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
],
usuarioController.add);

router.post('/login', 
[
    check('email').isEmail(),
    check('senha').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
],
usuarioController.login);

module.exports = router;