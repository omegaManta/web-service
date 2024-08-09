const {Router} = require('express')
const router = Router()
const {crearidentificacion,
mostraridentificacionunica,
mostraridentificacionunicapanel,
mostraridentificacionunicapanelinicial,
mostrartodo,eliminarnombre,mostrarlogos,crearlogo,eliminarlogo,
editarconfiguracion,
crearlogoemail,
eliminarlogoemail,
mostrarlogosemail,
veridentificacion
} = require('../../controlador/identificacion/identificacion')
const multer = require('multer');
const upload = multer({ dest: 'uploads' });


router.post('/nombres', crearidentificacion);
router.get('/unico',mostraridentificacionunica);
router.get('/unico-panel',mostraridentificacionunicapanel);
router.get('/unico-inicial',mostraridentificacionunicapanelinicial);
router.get('/varias',mostrartodo);
router.delete('/nombre/:idname',eliminarnombre);
router.get('/logos',mostrarlogos)
router.post('/logo',upload.single('video'),crearlogo);
router.post('/logo-email',upload.single('logo'),crearlogoemail);
router.get('/logos-email',mostrarlogosemail);
router.delete('/logo-email/:id_logo_email',eliminarlogoemail);
router.delete('/logo/:idlogo',eliminarlogo);
router.get('/nombres/:idname',veridentificacion);
router.put('/nombres/:idname',editarconfiguracion);



module.exports = router;