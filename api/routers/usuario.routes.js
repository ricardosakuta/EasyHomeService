var express = require('express');
var router = express.Router();
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuario.controller')

/* GET users listing. */
router.get('/email/:email', usuarioController.getByEmail);

router.put('/perfil/:id', usuarioController.update)

module.exports = router;