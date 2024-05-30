const {Router} = require('express');
const router = Router();
const {crearecibo,verecibos} = require('../../controlador/recibo/recibo');


router.post('/recibo',crearecibo);
router.get('/recibos',verecibos);


module.exports = router;