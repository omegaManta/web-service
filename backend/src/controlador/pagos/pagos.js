const jwt = require('jsonwebtoken');
const {pool} = require('../../db/conexion');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const upload = multer({dest: 'uploads'})


const crearcomprobante = async(req,res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: 'comprobantes-pagos',
        })
        const pagoUrl = result.secure_url;
        const {idempresa} = req.body;
        const guardar = await pool.query('insert into comprobante(idempresa,comprobante)values($1,$2)',[
            idempresa,
            pagoUrl
        ])
        res.status(200).json(result)
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}

const vercomprobantecliente = async(req,res)=>{
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
  
       pool.query('select c.idempresa,co.idcomprobante,co.comprobante from copia c join pedido p on c.idempresa = p.idempresa join comprobante co on c.idempresa = co.idempresa where c.idempresa = $1', [userId], (err, result) => {
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
    crearcomprobante,
    vercomprobantecliente
}