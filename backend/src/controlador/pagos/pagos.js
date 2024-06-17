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
    idempresa = req.params.idempresa;
    const response = await pool.query('select c.idempresa,co.idcomprobante,co.comprobante from copia c join pedido p on c.idempresa = p.idempresa join comprobante co on c.idempresa = co.idempresa where c.idempresa = $1 order by co.fecha_creacion desc limit 1',[
      idempresa
    ])
   res.status(200).json(response.rows);
  }

const eliminarcomprobante = async(req,res) => {
    idempresa = req.params.idempresa;
    const eliminar = await pool.query('delete from comprobante where idempresa = $1',[
        idempresa
    ])
    res.json({
        message: 'Comprobante eliminado'
    })
}


module.exports = {
    crearcomprobante,
    vercomprobantecliente,
    eliminarcomprobante
}