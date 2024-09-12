const {Router} = require('express');
const router = Router();
const {crearecibo,verecibos,verecibosbytotal} = require('../../controlador/recibo/recibo');


router.post('/recibo',crearecibo);
router.get('/recibos',verecibos);
router.get('/recibos-fecha',verecibosbytotal);


module.exports = router;