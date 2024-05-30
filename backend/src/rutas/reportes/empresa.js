const {Router} = require('express')
const router = Router()
const {verReport,movimientoinventario,kardexproductos
,existenciaproductos,costoinventario,kardexcliente,kardexproveedor,
cuentacobrar,ventafecha} = require('../../controlador/reportes/empresa')

//empresa
router.get('/periodo_empresa',verReport);
//inventario
router.get('/movimiento-inventario/:p_periodo/:p_desde/:p_hasta/:p_bodegas/:p_categorias',movimientoinventario);
router.get('/kardex-producto/:p_periodo/:p_producto/:p_desde/:p_hasta/:p_bodegas',kardexproductos);
router.get('/existencia-producto/:p_periodo/:p_tipo/:p_producto',existenciaproductos);
router.get('/costo-inventario/:p_periodo/:p_desde/:p_hasta/:p_categorias/:p_bodegas/:p_iva',costoinventario);
//facturacion
router.get('/kardex-cliente/:p_periodo/:p_tipocar/:p_cli_prov/:p_tipo/:p_desde/:p_hasta',kardexcliente);
router.get('/kardex-proveedor/:p_periodo/:p_tipocar/:p_categorias/:p_tipo/:p_desde/:p_hasta',kardexproveedor);
router.get('/cuenta-cobrar/:p_periodo/:p_tipocartera/:p_tipo/:p_tipod/:p_vendedor/:p_desde/:p_hasta/:p_saldo',cuentacobrar);
router.get('/venta-fecha/:p_periodo/:p_desde/:p_hasta/:p_tipo/:p_bodegas/:p_cli_prov/:p_vendedor',ventafecha);


module.exports = router