const {crearcontacto,
vercontactos,vercontacto,
editarcontacto,eliminarcontacto} = require('../controlador/informacion')
const {Router} = require('express')
const router = Router()


router.post('/contacto',crearcontacto)
router.get('/contactos',vercontactos)
router.get('/contacto/:idred',vercontacto)
router.put('/contacto/:idred',editarcontacto)
router.delete('/contacto/:idred',eliminarcontacto)


module.exports = router;