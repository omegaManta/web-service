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

const verclientes = async(req,res)=>{
    const ruc = req.params.ruc;
    
    // Iniciar el temporizador antes de realizar la operación
    const hrstart = process.hrtime();
  
    db.query(`select * from fac_clientes_proveedores`, function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el cliente de la empresa' });
        return;
      }
  
      // Calcular el tiempo de ejecución después de completar la operación
      const hrend = process.hrtime(hrstart);
      console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  
      res.status(200).json(data);
    });
}






const vertipodocumentos = async(req,res)=>{
 // Iniciar el temporizador antes de realizar la operación
 const hrstart = process.hrtime();
  
 db.query(`select * from fac_tipo_documento`, function (err, data) {
   if (err) {
     console.error(err);
     res.status(500).json({ error: 'Error al obtener el tipo de documento' });
     return;
   }

   // Calcular el tiempo de ejecución después de completar la operación
   const hrend = process.hrtime(hrstart);
   console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

   res.status(200).json(data);
 }); 
}



const vervendedores = async(req,res)=>{
  // Iniciar el temporizador antes de realizar la operación
 const hrstart = process.hrtime();
  
 db.query(`select * from fac_vendedores`, function (err, data) {
   if (err) {
     console.error(err);
     res.status(500).json({ error: 'Error al obtener el vendedor' });
     return;
   }

   // Calcular el tiempo de ejecución después de completar la operación
   const hrend = process.hrtime(hrstart);
   console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

   res.status(200).json(data);
 }); 
}


const verbodegas = async(req,res) => {
  // Iniciar el temporizador antes de realizar la operación
 const hrstart = process.hrtime();
  
 db.query(`select * from inv_bodega`, function (err, data) {
   if (err) {
     console.error(err);
     res.status(500).json({ error: 'Error al obtener la bodega' });
     return;
   }

   // Calcular el tiempo de ejecución después de completar la operación
   const hrend = process.hrtime(hrstart);
   console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

   res.status(200).json(data);
 }); 
}

module.exports = {
    verclientes,
    vertipodocumentos,
    vervendedores,
    verbodegas
}