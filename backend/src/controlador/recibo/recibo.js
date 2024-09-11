const {pool} = require('../../db/conexion');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');




const crearecibo = async(req,res) => {
    try {
        const { idempresa, descripcion,precio } = req.body;
        await pool.query('INSERT INTO recibo (idempresa,descripcion,precio) VALUES ($1,$2,$3)', [idempresa, descripcion,precio]);
        res.json({
            message: 'Recibo guardado satisfactoriamente'
        });
    } catch (error) {
        console.error('Error al guardar el recibo:', error);
        res.status(500).json({
            message: 'Error al guardar el recibo'
        });
    }
}

const verecibos = async(req,res) => {
    const token = req.headers.authorization;
      
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
    
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
    
      pool.query('select c.nombre_empresa,r.fecha_creacion,r.precio,r.descripcion from recibo r join copia c on c.idempresa = r.idempresa join usuario u on u.idusuario = c.idusuario where u.idusuario = $1', [userId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
          return;
        }
    
        const userProfile = result.rows;
        res.json({ profile: userProfile });
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Token inválido' });
    }
}
  


module.exports = {
    crearecibo,
    verecibos
}