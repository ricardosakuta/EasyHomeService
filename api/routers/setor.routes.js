var express = require('express');
var router = express.Router();
const { check } = require('express-validator')
const setorController = require('../controllers/setor.controller')

/* GET users listing. */
router.get('/', setorController.getAll);

router.post('/',
	[
		check('descricao').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
		check('cidade_id').isFloat({ min: 1 })
	],
	setorController.add);


router.put('/:id',
	[
		check('descricao').not().isEmpty().isLength({ min: 5, max: 100 }).trim(),
		check('cidade_id').isFloat({ min: 1 })
	],
	setorController.update
);

router.delete('/:id', setorController.delete);

module.exports = router;