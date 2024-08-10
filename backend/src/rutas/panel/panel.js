const {Router} = require('express');
const router = Router();
const {crearol,crearusuario,verroles,verusuarios,login,verperfil,verpedidovendedor,
editarusuario,verusuario,verfacturacliente,verclientesvendedor,sumartotalpedido,
eliminarususario,verperfilconfiguracion,verperfilcorreo} = require('../../controlador/panel/panel');



router.post('/rol',crearol);
router.post('/usuario',crearusuario);
router.get('/roles',verroles);
router.get('/users',verusuarios);
router.post('/login',login);
router.get('/user',verperfil);
router.get('/pedido-vendedor/:idempresa',verpedidovendedor);
router.put('/usuario/:idusuario',editarusuario);
router.get('/user/:idusuario',verusuario);
router.get('/factura/:idempresa',verfacturacliente);
router.get('/cliente-vendedor',verclientesvendedor);
router.get('/sumar-total/:idempresa',sumartotalpedido);
router.delete('/usuario/:idusuario',eliminarususario);
router.get('/usuario-config',verperfilconfiguracion);
router.get('/usuario-correo',verperfilcorreo);



module.exports = router;