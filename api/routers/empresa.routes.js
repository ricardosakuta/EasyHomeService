var express = require('express');
var router = express.Router();
const empresaController = require('../controllers/empresa.controller')
const { check } = require('express-validator')

router.get('/:idCliente',
    empresaController.get
)

router.post('/',
    [
        check('nome').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
        check('descricao').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
        check('cliente_id').isFloat({ min: 1 }),
        check('cidade_id').isFloat({ min: 1 }),
        check('setor_id').isFloat({ min: 1 }),
    ],
    empresaController.add);

router.put('/:id',
    [
        check('nome').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
        check('descricao').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
        check('cliente_id').isFloat({ min: 1 }),
        check('cidade_id').isFloat({ min: 1 }),
        check('setor_id').isFloat({ min: 1 }),
    ],
    empresaController.update);

router.delete('/:id',
    empresaController.delete
)

module.exports = router;