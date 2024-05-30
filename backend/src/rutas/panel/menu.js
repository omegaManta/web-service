const {Router} = require('express');
const router = Router();
const {crearmenu,menu,vermenuperfil,eliminarmenu} = require('../../controlador/panel/menu');


router.post('/menu',crearmenu);
router.get('/opciones',menu);
router.get('/menu-perfil',vermenuperfil);
router.delete('/menu/:idmenu',eliminarmenu);


module.exports = router;