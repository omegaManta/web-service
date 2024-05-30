const {Router} = require('express')
const router = Router()
const {crearidentificacion,
mostraridentificacionunica,
mostrartodo,eliminarnombre,mostrarlogos,crearlogo,eliminarlogo
} = require('../../controlador/identificacion/identificacion')
const multer = require('multer');
const upload = multer({ dest: 'uploads' });


router.post('/nombres', crearidentificacion);
router.get('/unico',mostraridentificacionunica);
router.get('/varias',mostrartodo);
router.delete('/nombre/:idname',eliminarnombre);
router.get('/logos',mostrarlogos)
router.post('/logo',upload.single('video'),crearlogo);
router.delete('/logo/:idlogo',eliminarlogo);



module.exports = router;