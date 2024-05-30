const {Router} = require('express')
const {creartecnico,vertecnicos,
vertecnico,editartecnico,eliminartecnico
} = require('../../controlador/tecnico/tecnico')
const router = Router()


router.post('/tecnicos',creartecnico)
router.get('/tecnicos',vertecnicos)
router.get('/tecnico/:idtecnico',vertecnico)
router.put('/tecnico/:idtecnico',editartecnico)
router.delete('/tecnico/:idtecnico',eliminartecnico)






module.exports = router