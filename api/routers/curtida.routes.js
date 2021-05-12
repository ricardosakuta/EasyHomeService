var express = require('express');
var router = express.Router();
const curtidaController = require('../controllers/curtida.controller');

router.get('/quantidade/:cliente_id', curtidaController.getByQuantidade);

router.get('/:cliente_id', curtidaController.getBycliente);

router.post('/', curtidaController.add);

router.delete('/:empresa_id/:seq/:cliente_id', curtidaController.delete)

module.exports = router;