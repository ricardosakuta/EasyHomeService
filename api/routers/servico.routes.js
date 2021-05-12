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
router.get('/:id', servicoController.getAll);

router.get('/cidade/:id_cliente/:id_cidade', servicoController.getByCidade);

router.post('/', upload.single('upload'), servicoController.post);

router.delete('/:empresa_id/:seq', servicoController.delete);

router.put('/:empresa_id/:seq', upload.single('upload'), servicoController.update);

module.exports = router;