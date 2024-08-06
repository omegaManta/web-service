const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion');
const jwt = require('jsonwebtoken');


const upload = multer({dest: 'uploads'});


const crearanuncio = async(req,res)=>{
    try {
        
        const result = await cloudinary.uploader.upload(req.file.path,{
            resource_type: 'auto',
            folder: 'anuncios'
        })
        const archivoUrl = result.secure_url;
        const {idusuario,descripcion} = req.body;
        const guardar = await pool.query('insert into publicidad(idusuario,archivo,descripcion)values($1,$2,$3)',[
            idusuario,
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
const response = await pool.query('select idpubli,archivo,descripcion,idusuario from publicidad')
res.status(200).json(response.rows)
}

const publicidad = async(req,res)=>{
    const token = req.headers.authorization;
    
if (!token) {
  res.status(401).json({ error: 'Token no proporcionado' });
  return;
}

try {
  const decoded = jwt.verify(token, 'sistema omega web');
  const userId = decoded.userId;

  pool.query('select p.idpubli,p.archivo,p.descripcion from publicidad p join usuario u on u.idusuario = p.idusuario join copia c on u.idusuario = c.idusuario where c.idempresa = $1 order by p.fecha_hora desc limit 3', [userId], (err, result) => {
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

    const publicidadpanel = async(req,res)=>{
        const token = req.headers.authorization;
        
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
    
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
    
      pool.query('select p.idpubli,p.archivo,p.descripcion from publicidad p join usuario u on u.idusuario = p.idusuario  where u.idusuario = $1', [userId], (err, result) => {
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
publicidad,
publicidadpanel
}