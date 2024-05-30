const {Router} = require('express');
const router = Router();
const {crearorden,ejecutarpago} = require('../../controlador/pagos/pagos');

router.post('/crear-orden',crearorden);
router.post('/hacer-pago',ejecutarpago);


module.exports = router;