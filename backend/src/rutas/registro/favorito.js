const {Router} = require('express')
const {crearfavorito,verperfildeseos} 
= 
require('../../controlador/registro/favorito')
const router = Router();



router.post('/favorito',crearfavorito);
router.get('/favoritos',verperfildeseos);


module.exports = router;