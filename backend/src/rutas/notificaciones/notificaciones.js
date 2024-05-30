const {Router} = require('express');
const {enviarMensaje} = require('../../controlador/notificaciones/notificaciones');
const router = Router();



router.post('/correo',enviarMensaje);


module.exports = router;