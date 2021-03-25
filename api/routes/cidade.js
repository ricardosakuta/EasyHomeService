var express = require('express');
var router = express.Router();
const {pool, postLimiter} = require('../db/config')
const {body, check} = require('express-validator')

/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM cidade', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
});

router.post(
  '/',
  [
    check('id').not().isEmpty(),
    check('nome').not().isEmpty().isLength({min: 5, max: 255}).trim(),
    check('UF').not().isEmpty().isLength({min: 2, max: 2}).trim(),
  ],
  function(req, res, next) {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({errors: errors.array()})
    }

    const {id, nome, uf} = request.body

    pool.query(
      'INSERT INTO cidade (id, nome, uf) VALUES ($1, $2, $3)',
      [id, nome, uf],
      (error) => {
        if (error) {
          throw error
        }
        response.status(201).json({status: 'success', message: 'Cidade adicionada com sucesso.'})
      },
    )
});

module.exports = router;