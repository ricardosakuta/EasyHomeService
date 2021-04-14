var express = require('express');
var router = express.Router();

const authGoogleController = require('../controllers/authGoogle.controller')

router.post('/', authGoogleController.add);

module.exports = router;