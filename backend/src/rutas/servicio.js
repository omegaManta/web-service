const {buscarServicio,verServicios,crearservicio,verservicio,
    editarServicio,eliminarservicio,
crearcategoria,vercategorias,vercategoria,editarcategoria,
eliminarcategoria,detalleservicio,muestracategoria,contarservicios
} = require('../controlador/servicio')
const {Router} = require('express')
const router = Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
//servicios
router.get('/servicio/:descripcion',buscarServicio);
router.get('/servicios',verServicios)
router.post('/servicios',upload.single("image"), crearservicio)
router.put('/servicio/editar/:idservicio', upload.single('foto'), editarServicio);
router.delete('/servicio/:idservicio',eliminarservicio)
router.get('/serviciobyid/:idservicio',verservicio)
router.get('/detalle-servicio/:idservicio',detalleservicio)
router.get('/detalle-categoria/:idcategoria',muestracategoria)
router.get('/conteo-servicio',contarservicios);



//categorias
router.post('/categorias',crearcategoria)
router.get('/categorias',vercategorias)
router.get('/categoria/:idcategoria',vercategoria)
router.put('/categoria/:idcategoria',editarcategoria)
router.delete('/categoria/:idcategoria',eliminarcategoria)



module.exports = router;