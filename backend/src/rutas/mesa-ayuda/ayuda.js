const {Router} = require('express')
const router = Router()
const {crearvideoayuda,mostrarvideoayuda,mostrarlos,eliminarvideoayuda
} = require('../../controlador/mesa-ayuda/ayuda')
const multer = require('multer');
const upload = multer({ dest: 'uploads' });



router.post('/ayuda',upload.single('video'),crearvideoayuda);
router.get('/ayuda',mostrarvideoayuda);
router.get('/ayudas',mostrarlos);
router.delete('/ayuda/:idvideo',eliminarvideoayuda);


module.exports = router;