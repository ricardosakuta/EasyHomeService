var express = require('express');
var router = express.Router();
const {pool} = require('../db/config')

/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM cidade', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
});

router.post('', function(req, res, next) {

});

module.exports = router;