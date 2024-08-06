const {Router} = require('express')
const router = Router()
const {crearanuncio,veranuncios,eliminaranuncio,publicidad} = require('../../controlador/publicidad/publicidad');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });


router.post('/anuncio',upload.single('video'),crearanuncio);
router.get('/anuncios',veranuncios);
router.delete('/anuncio/:idpubli',eliminaranuncio);
router.get('/publicidad',publicidad);

module.exports = router;