const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion')

const upload = multer ({dest: 'uploads'});


const crearvideoayuda = async(req,res)=>{
const result = cloudinary.uploader.upload(req.file.path,{
    resource_type:'video',
    folder: 'videos ayuda'
})
const videoUrl =  (await result).secure_url;
const guarda = await pool.query('insert into video_ayuda(video)values($1)',[
    videoUrl
])
res.status(200).json(result);
}



 const mostrarvideoayuda = async(req,res)=>{
    const ver = await pool.query('select idvideo, video from video_ayuda order by fecha_hora desc limit 1')
    res.status(200).json(ver.rows);
 }

 const mostrarlos = async(req,res)=>{
   const response = await pool.query('select idvideo,video from video_ayuda')
   res.status(200).json(response.rows);
 }


 const eliminarvideoayuda = async(req,res)=>{
    const idvideo = req.params.idvideo;
    const borra = await pool.query('delete from video_ayuda where idvideo = $1',[
        idvideo
    ])
    res.json({
        message: 'Video borrado sastifactoriamente'
    })
 }



 module.exports = {
    crearvideoayuda,
    mostrarvideoayuda,
    mostrarlos,
    eliminarvideoayuda
 }