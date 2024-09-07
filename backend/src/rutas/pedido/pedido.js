const {Router} = require('express')
const {crearpedido,verpedidos,
    solicitudpedidos,
eliminarpedido,
creartrabajorealizado,
vertrabajosrealizados,
buscartrabajorealizado,
verpedido,crearvisita,visitas,visita,eliminarpedir,updatecantidadprecio
} = require('../../controlador/pedido/pedido')
const router = Router()

//trabajos pedidos
router.post('/pedido',crearpedido);
router.get('/pedidos',verpedidos);
router.get('/pedido/:idpedido',verpedido);
router.get('/solicitud-pedido/:nombres',solicitudpedidos);
router.delete('/pedido/:idempresa',eliminarpedido);
router.delete('/pedir/:idpedido',eliminarpedir);
router.put('/agrega-carrito/:idservicio',updatecantidadprecio);
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

//trabajos realizados
router.post('/trabajo_realizado',upload.single('firma'),creartrabajorealizado);
router.get('/realizados',vertrabajosrealizados);
router.get('/buscar/:nombre_empresa',buscartrabajorealizado);


//visitas
router.post('/visita',crearvisita);
router.get('/ver-visitas',visitas);
router.get('/visita/:idpedido',visita);


module.exports = router;