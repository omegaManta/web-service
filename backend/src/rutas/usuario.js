const {verUser,
crearUser
} = require('../controlador/usuario')
const {Router} = require('express')
const router = Router()

router.get('/usuarios',verUser)
router.post('/usuarios',crearUser)

module.exports = router;

