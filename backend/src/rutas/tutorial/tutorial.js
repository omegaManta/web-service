const {Router} = require('express')
const {creartutorial,tutoriales,eliminartutorial} = require('../../controlador/tutorial/tutorial')
const router = Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads' });



router.post('/tutorial',upload.single('video'),creartutorial);
router.get('/tutoriales',tutoriales);
router.delete('/tutorial/:idtutorial',eliminartutorial);

module.exports = router;