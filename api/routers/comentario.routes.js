var express = require('express');
var router = express.Router();
const { check } = require('express-validator')
const comentarioController = require('../controllers/comentario.controller')

/* GET users listing. */
router.get('/:empresa_id/:seq_servico', comentarioController.getAll);

router.post('/',
[
    check('texto').not().isEmpty().isLength({ min: 5, max: 255 }).trim(),
    check('empresa_id').isFloat({ min: 1 })
], comentarioController.add);

module.exports = router;