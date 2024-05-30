var Sybase = require('sybase'),
    db = new Sybase('localhost', 2638, 'Datos5', 'dba', 'ALFA2018');


    
db.connect(function(err) {
  if (err) {
      console.error('Error al conectar con la base de datos:', err);
      process.exit(1); // Detiene la aplicación si no se puede conectar
  }
  console.log('Conexión exitosa a la base de datos Sybase.');
  
  // Inicia el servidor o realiza otras operaciones aquí
});

    const verReport = async (req, res) => {
     // const ruc = req.params.ruc;
    
      // Iniciar el temporizador antes de realizar la operación
      const hrstart = process.hrtime();
    
      db.query(`select * from sys_periodo`, function (err, data) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
          return;
        }
    
        // Calcular el tiempo de ejecución después de completar la operación
        const hrend = process.hrtime(hrstart);
        console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
        res.status(200).json(data);
      });
    };


    //movimiento de inventario
    const movimientoinventario = async(req,res)=>{
      const p_periodo = req.params.p_periodo;
      const p_desde = req.params.p_desde;
      const p_hasta = req.params.p_hasta;
      const p_bodegas = req.params.p_bodegas;
      const p_categorias = req.params.p_categorias;
  
  // Iniciar el temporizador antes de realizar la operación
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."fact_rep_mov_inventario" '${p_periodo}', '${p_desde}', '${p_hasta}', '${p_bodegas}','${p_categorias}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  });
    }



// kardex de productos
    const kardexproductos = async(req,res)=>{
      const p_periodo = req.params.p_periodo;
      const p_producto = req.params.p_producto;
      const p_desde = req.params.p_desde;
      const p_hasta = req.params.p_hasta;
      const p_bodegas = req.params.p_bodegas;
  
  // Iniciar el temporizador antes de realizar la operación
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."inv_rep_kardex_prodcuto" '${p_periodo}','${p_producto}', '${p_desde}', '${p_hasta}', '${p_bodegas}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
    }




//existencia de productos  
   const existenciaproductos = async(req,res)=>{
    const p_periodo = req.params.p_periodo;
    const p_tipo = req.params.p_tipo;
    const p_producto = req.params.p_producto;
  
  // Iniciar el temporizador antes de realizar la operación
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."inv_rep_existencia_producto" '${p_periodo}','${p_tipo}','${p_producto}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
   } 


//costo de inventario
   const costoinventario = async(req,res)=>{
    const p_periodo = req.params.p_periodo;
    const p_desde = req.params.p_desde;
    const p_hasta = req.params.p_hasta;
    const p_categorias = req.params.p_categorias;
    const p_bodegas = req.params.p_bodegas;
    const p_iva = req.params.p_iva;


    
  
  // Iniciar el temporizador antes de realizar la operación
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."inv_rep_costo_inventario" '${p_periodo}','${p_desde}','${p_hasta}','${p_categorias}','${p_bodegas}','${p_iva}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
   }


//kardex de cliente
   const kardexcliente = async(req,res)=>{
    const p_periodo = req.params.p_periodo;
    const p_tipocar = req.params.p_tipocar;
    const p_cli_prov = req.params.p_cli_prov;
    const p_tipo = req.params.p_tipo;
    const p_desde = req.params.p_desde;
    const p_hasta = req.params.p_hasta;


    // Iniciar el temporizador antes de realizar la operación
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."fac_rep_kardex_clientes_proveedores" '${p_periodo}','${p_tipocar}','${p_cli_prov}','${p_tipo}','${p_desde}','${p_hasta}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
   }


const kardexproveedor = async(req,res)=>{
    const p_periodo = req.params.p_periodo;
    const p_tipocar = req.params.p_tipocar;
    const p_categorias = req.params.p_categorias;
    const p_tipo = req.params.p_tipo;
    const p_desde = req.params.p_desde;
    const p_hasta = req.params.p_hasta;


    // Iniciar el temporizador antes de realizar la 
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."fac_rep_kardex_proveedores_general" '${p_periodo}','${p_tipocar}','${p_categorias}','${p_tipo}','${p_desde}','${p_hasta}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
}


const cuentacobrar = async(req,res)=>{
    const p_periodo = req.params.p_periodo;
    const p_tipocartera = req.params.p_tipocartera;
    const p_tipo = req.params.p_tipo;
    const p_tipod = req.params.p_tipod;
    const p_vendedor = req.params.p_vendedor;
    const p_desde = req.params.p_desde;
    const p_hasta = req.params.p_hasta;
    const p_saldo = req.params.p_saldo;


    // Iniciar el temporizador antes de realizar la 
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."fac_rep_deuda_general_facturas" '${p_periodo}','${p_tipocartera}','${p_tipo}','${p_tipod}','${p_vendedor}','${p_desde}','${p_hasta}','${p_saldo}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
}


//ventas por fechas
const ventafecha = async(req,res)=>{
 const p_periodo = req.params.p_periodo;
 const p_desde = req.params.p_desde;
 const p_hasta = req.params.p_hasta;
 const p_tipo = req.params.p_tipo;
 const p_bodegas = req.params.p_bodegas;
 const p_cli_prov = req.params.p_cli_prov;
 const p_vendedor = req.params.p_vendedor;


  // Iniciar el temporizador antes de realizar la 
  const hrstart = process.hrtime();
  
  // Llamar al procedimiento almacenado a través de una consulta SQL directa
  db.query(`EXECUTE "DBA"."fact_rep_documentos" '${p_periodo}','${p_desde}','${p_hasta}','${p_tipo}','${p_bodegas}','${p_cli_prov}','${p_vendedor}'`, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
      return;
    }
    
    // Calcular el tiempo de ejecución después de completar la operación
    const hrend = process.hrtime(hrstart);
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    
    res.status(200).json(data);
  }); 
}




    module.exports = {
      verReport,
      movimientoinventario,
      kardexproductos,
      existenciaproductos,
      costoinventario,
      kardexcliente,
      kardexproveedor,
      cuentacobrar,
      ventafecha
    }