var express = require('express');
var router = express.Router();
const relatorioController = require('../controllers/relatorio.controller')

/* GET users listing. */
router.get('/:opcao', relatorioController.getRelatorio);

module.exports = router;