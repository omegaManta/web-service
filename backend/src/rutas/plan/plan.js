const {Router} = require('express')
const {crearplan,verplanes
,verplan,editarplan,eliminarplan} = require('../../controlador/plan/plan')
const router = Router()


router.post('/planes',crearplan)
router.get('/planes',verplanes)
router.get('/plan/:idplan',verplan)
router.put('/plan/:idplan',editarplan)
router.delete('/plan/:idplan',eliminarplan)

module.exports = router