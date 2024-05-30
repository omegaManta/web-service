const {Router} = require('express')
const router = Router()
const {crearLogin,verperfil,verperfilpedidos,
verperfiltrabajosrealizados,verperfilcomentario,
verperfildetalleobservacion,verperfilvisitas,contarpedidos,contarcompletados,sumarpedidoscliente,verecibosclientes,
verecibo
} = require('../../controlador/login/empresa')
const jwt = require('jsonwebtoken');

router.post('/sesion',crearLogin);
router.get('/perfil',verperfil);
router.get('/perfil-pedidos',verperfilpedidos);
router.get('/trabajo-realizado',verperfiltrabajosrealizados);
router.get('/comentario',verperfilcomentario);
router.get('/detalle-observacion/:idpedido',verperfildetalleobservacion);
router.get('/visitas',verperfilvisitas);  
router.get('/conteo-pedido',contarpedidos);  
router.get('/conteo-completado',contarcompletados);  
router.get('/total-pedido',sumarpedidoscliente);  
router.get('/recibo-cliente',verecibosclientes);  
router.get('/recibo',verecibo);



module.exports = router;