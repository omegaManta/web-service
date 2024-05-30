const {pool} = require('../../db/conexion');
const cron = require('node-cron');




const crearecibo = async(req,res) => {
    try {
        const { idempresa, recibo } = req.body;
        await pool.query('INSERT INTO recibo (idempresa, recibo) VALUES ($1, $2)', [idempresa, recibo]);
        res.json({
            message: 'Recibo guardado satisfactoriamente'
        });
        eliminarRecibosAntiguos();
    } catch (error) {
        console.error('Error al guardar el recibo:', error);
        res.status(500).json({
            message: 'Error al guardar el recibo'
        });
    }
}

const verecibos = async(req,res) => {
    const response = await pool.query('select c.nombre_empresa,r.recibo,r.fecha_creacion from recibo r join copia c on c.idempresa = r.idempresa ');
    res.status(200).json(response.rows);
}


async function eliminarRecibosAntiguos() {
    const client = await pool.connect();
    try {
      await client.query('SELECT eliminar_recibos()');
      console.log('Cada registro de recibos se eliminara despues de 24 horas creado');
    } catch (error) {
      console.error('Error al eliminar recibos antiguos:', error);
    } finally {
      client.release();
    }
  }
  


module.exports = {
    crearecibo,
    verecibos
}