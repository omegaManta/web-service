const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion');


const upload = multer({dest: 'uploads'});


const crearanuncio = async(req,res)=>{
    try {
        
        const result = await cloudinary.uploader.upload(req.file.path,{
            resource_type: 'auto',
            folder: 'anuncios'
        })
        const archivoUrl = result.secure_url;
        const {descripcion} = req.body;
        const guardar = await pool.query('insert into publicidad(archivo,descripcion)values($1,$2)',[
            archivoUrl,
            descripcion
        ])
        res.status(200).json(result)
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}


const veranuncios = async(req,res)=>{
const response = await pool.query('select idpubli,archivo,descripcion from publicidad')
res.status(200).json(response.rows)
}

const publicidad = async(req,res)=>{
    const response = await pool.query('select idpubli,archivo,descripcion from publicidad order by fecha_hora desc limit 3')
    res.status(200).json(response.rows)
    }


const eliminaranuncio = async(req,res)=>{
    const idpubli = req.params.idpubli;
    const eliminar = await pool.query('delete from publicidad where idpubli = $1',[
        idpubli
    ])
    res.json({
        message: 'Anuncio eliminado'
    })
}


module.exports = {
crearanuncio,
veranuncios,
eliminaranuncio,
publicidad
}