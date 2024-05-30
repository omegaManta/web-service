const {Router} = require('express')
const {crearobservacion,verobservaciones,eliminarobservacion} = 
require('../../controlador/observacion/observacion')
const router = Router()




router.post('/observacion',crearobservacion);
router.get('/observaciones',verobservaciones);
router.delete('/observacion/:idob',eliminarobservacion);


module.exports = router;