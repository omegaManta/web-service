const {Router} = require('express');
const router = Router();
const {crearecibo,verecibos,verecibosbyfecha} = require('../../controlador/recibo/recibo');


router.post('/recibo',crearecibo);
router.get('/recibos',verecibos);
router.get('/recibos-fecha',verecibosbyfecha);


module.exports = router;