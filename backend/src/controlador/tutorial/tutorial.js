const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion')


const upload = multer({dest: 'uploads'})



const creartutorial = async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.file.path,{
        resource_type:'video',
        folder: 'tutoriales'
      })
      const videoUrl = result.secure_url;
      const {idservicio} = req.body;
      const guardar = await pool.query('insert into tutorial(idservicio,video)values($1,$2)',[
        idservicio,
        videoUrl
      ])
      res.status(200).json(result);
}



const tutoriales = async(req,res)=>{
const response = await pool.query('select t.video,s.descripcion,s.duracion,s.precio from tutorial t join servicio s on s.idservicio = t.idservicio')
res.status(200).json(response.rows);
}

module.exports = {
    creartutorial,
    tutoriales
}