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



module.exports = {
    crearcomprobante
}