var express = require('express');
var router = express.Router();
const cidadeController = require('../controllers/cidade.controller')
const { check } = require('express-validator')

router.get('/', 
cidadeController.getAll);

router.post('/', 
[
	check('nome').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
	check('uf').isIn(cidadeController.estados),
],
cidadeController.add);

router.put('/:id', 
[
	check('nome').not().isEmpty().isLength({ min: 5, max: 100 }).trim(),
	check('uf').isIn(cidadeController.estados),
],
cidadeController.update);

router.delete('/:id', cidadeController.delete);

module.exports = router;