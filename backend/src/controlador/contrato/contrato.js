const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion');


const upload = multer({dest: 'uploads'})



const crearcontrato = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: 'contratos',
        })
        const pdfUrl = result.secure_url;
        const guardar = await pool.query('insert into archivo(contrato)values($1)',[
            pdfUrl
        ])
        res.status(200).json(result)
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}



const vercontrato = async(req,res)=>{
const response = await pool.query('select idpdf,contrato from archivo order by fecha_hora desc limit 1')
res.status(200).json(response.rows)
}


const vercontratos = async(req,res)=>{
    const response = await pool.query('select idpdf,contrato from archivo')
    res.status(200).json(response.rows)
}


const borrarcontrato = async(req,res)=>{
const idpdf = req.params.idpdf;
const borrar = await pool.query('delete from archivo where idpdf = $1',[
    idpdf
])
res.json({
    message: 'Contrato borrado sastifactoriamente'
})
}




module.exports = {
    crearcontrato,
    vercontrato,
    vercontratos,
    borrarcontrato
}