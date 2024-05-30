const {Router} = require('express')
const {creardesactivado,
    mostrardesactivados,
    activarcliente,
    buscardesactivados} = 
    require('../../controlador/registro/desactivado')
const router = Router()

router.post('/desactivados',creardesactivado)
router.get('/desactivados',mostrardesactivados)
router.delete('/desactivado/:idEmpresa',activarcliente)
router.get('/desactivado/:nombre_empresa',buscardesactivados)


module.exports = router