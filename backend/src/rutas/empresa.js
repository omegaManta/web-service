const {crearEnlaces,
    verEnlaces,
    verenlace,
    editarenlace,
    eliminarenlace
} = require('../controlador/empresa')
const {Router} = require('express')
const router = Router()


router.post('/enlaces',crearEnlaces);
router.get('/enlaces',verEnlaces);
router.get('/enlace/:iden',verenlace);
router.put('/enlace/:iden',editarenlace);
router.delete('/enlace/:iden',eliminarenlace);

module.exports = router;