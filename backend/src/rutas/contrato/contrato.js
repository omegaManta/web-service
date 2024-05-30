const {Router} = require('express')
const router = Router()
const {crearcontrato,vercontrato,vercontratos,borrarcontrato} = require('../../controlador/contrato/contrato')
const multer = require('multer');
const upload = multer({ dest: 'uploads' });


router.post('/pdf', upload.single('file'),crearcontrato);
router.get('/archivo',vercontrato);
router.get('/archivos',vercontratos);
router.delete('/contrato/:idpdf',borrarcontrato);


module.exports = router;