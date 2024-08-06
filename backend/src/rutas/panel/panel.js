const {Router} = require('express');
const router = Router();
const {crearol,crearusuario,verroles,verusuarios,login,verperfil,verpedidotecnico,
editarusuario,verusuario,verfacturacliente,verclientesatecnico,sumartotalpedido,
eliminarususario,verperfilconfiguracion} = require('../../controlador/panel/panel');



router.post('/rol',crearol);
router.post('/usuario',crearusuario);
router.get('/roles',verroles);
router.get('/users',verusuarios);
router.post('/login',login);
router.get('/user',verperfil);
router.get('/pedido-tecnico/:idempresa',verpedidotecnico);
router.put('/usuario/:idusuario',editarusuario);
router.get('/user/:idusuario',verusuario);
router.get('/factura/:idempresa',verfacturacliente);
router.get('/cliente-tecnico',verclientesatecnico);
router.get('/sumar-total/:idempresa',sumartotalpedido);
router.delete('/usuario/:idusuario',eliminarususario);
router.get('/usuario-config',verperfilconfiguracion);



module.exports = router;