const {Router} = require('express')
const router = Router()
const {crearanuncio,veranuncios,eliminaranuncio,publicidad,publicidadpanel} = require('../../controlador/publicidad/publicidad');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });


router.post('/anuncio',upload.single('video'),crearanuncio);
router.get('/anuncios',veranuncios);
router.delete('/anuncio/:idpubli',eliminaranuncio);
router.get('/publicidad',publicidad);
router.get('/publicidad-panel',publicidadpanel);


module.exports = router;