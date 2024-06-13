const {Router} = require('express');
const router = Router();
const {crearcomprobante} = require('../../controlador/pagos/pagos');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.post('/crear-comprobante',upload.single('pago'),crearcomprobante);


module.exports = router;