const {Router} = require('express');
const router = Router();
const {crearcomprobante,vercomprobantecliente,eliminarcomprobante} = require('../../controlador/pagos/pagos');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.post('/crear-comprobante',upload.single('pago'),crearcomprobante);
router.get('/ver-comprobante',vercomprobantecliente);
router.delete('/comprobante/:idcomprobante',eliminarcomprobante);

module.exports = router;