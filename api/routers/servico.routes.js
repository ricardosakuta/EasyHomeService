var express = require('express');
var router = express.Router();
const servicoController = require('../controllers/servico.controller');
const multer = require('multer');

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 10000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Serviço');
});

router.post('/', upload.single('upload'), servicoController.post);

module.exports = router;