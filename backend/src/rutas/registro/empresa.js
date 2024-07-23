const {Router} = require('express')
const {crearCuenta, getSolicitudes, 
    crearSolicitud, veraceptados,verclientesusuario,
     buscaraceptados,
eliminarEmpresa, ver, 
desactivarcliente, 
vercliente,
actualizarcliente,
vertodo,eliminartodo} 
= 
require('../../controlador/registro/empresa')
const router = Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads' });



router.post('/registro',upload.single('file'),crearCuenta);
router.get('/solicitud/:nombre_empresa',getSolicitudes)
router.get('/ver', ver)
router.post('/solicitud',crearSolicitud)
router.delete('/empresa/:idEmpresa',eliminarEmpresa)
router.get('/aceptados',veraceptados)
router.get('/clientes-usuario',verclientesusuario)
router.get('/aceptados/:nombre_empresa',buscaraceptados)
router.delete('/aceptado/:idEmpresa',desactivarcliente)
router.get('/aceptado/:idEmpresa',vercliente)
router.put('/aceptado/:idEmpresa',actualizarcliente)
router.get('/clientes',vertodo)
router.delete('/cliente/:idempresa',eliminartodo)


module.exports = router;