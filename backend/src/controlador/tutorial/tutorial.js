const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion');
const jwt = require('jsonwebtoken');


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
const token = req.headers.authorization;
    
if (!token) {
  res.status(401).json({ error: 'Token no proporcionado' });
  return;
}

try {
  const decoded = jwt.verify(token, 'panel omega web');
  const userId = decoded.userId;

  pool.query('select t.idtutorial,t.video,s.descripcion,s.precio from tutorial t join servicio s on s.idservicio = t.idservicio join categoria c on c.idcategoria = s.idcategoria join usuario u on u.idusuario = c.idusuario where u.idusuario = $1', [userId], (err, result) => {
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


const eliminartutorial = async(req,res) => {
  const idtutorial = req.params.idtutorial;
  const eliminar = await pool.query('delete from tutorial where idtutorial = $1',[
    idtutorial
  ]);
  res.json({
    message: 'Tutorial eliminado'
  })
}

module.exports = {
    creartutorial,
    tutoriales,
    eliminartutorial
}