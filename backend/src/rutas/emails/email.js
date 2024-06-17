const {Router} = require('express')
const router = Router()
const {crearnotificaciontecnico,crearnotificacioncliente,
crearnotificacionpedido,crearnotificacioncompletado,
crearnotificacionobservacion,
crearnotificacionvisita,crearnotificacionrechazado} = require('../../controlador/emails/email')


router.post('/notificacion-tecnico',crearnotificaciontecnico);
router.post('/notificacion-cliente',crearnotificacioncliente);
router.post('/notificacion-pedido',crearnotificacionpedido);
router.post('/notificacion-completada',crearnotificacioncompletado);
router.post('/notificacion-observacion',crearnotificacionobservacion);
router.post('/notificacion-visita',crearnotificacionvisita);
router.post('/notificacion-rechazo',crearnotificacionrechazado);






module.exports = router;