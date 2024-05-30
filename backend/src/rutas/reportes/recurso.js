const {Router} = require('express');
const router = Router();
const {verclientes,vertipodocumentos,vervendedores,verbodegas} = require('../../controlador/reportes/recurso');



router.get('/cli',verclientes);
router.get('/documento',vertipodocumentos);
router.get('/vendedor',vervendedores);
router.get('/bodega',verbodegas);





module.exports = router;