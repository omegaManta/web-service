const {pool} = require('../db/conexion');
const jwt = require('jsonwebtoken');




const crearEnlaces = async(req,res)=>{
const {idusuario,nombre,url} = req.body;
const guarda = await pool.query('insert into enlaces(idusuario,nombre,url)values($1,$2,$3)',[
  idusuario,
  nombre,
  url
])
res.json({
  message: 'Servicio externo creado sastifactoriamente',
  body:{
      enlaces:{nombre,url}
  }
})
}



const verEnlacespanel = async(req,res)=>{
const token = req.headers.authorization;
    
if (!token) {
  res.status(401).json({ error: 'Token no proporcionado' });
  return;
}

try {
  const decoded = jwt.verify(token, 'panel omega web');
  const userId = decoded.userId;

  pool.query('select e.iden,e.nombre,e.url from enlaces e join usuario u on u.idusuario = e.idusuario where u.idusuario = $1', [userId], (err, result) => {
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


const verEnlaces = async(req,res)=>{
  const token = req.headers.authorization;
      
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;
  
    pool.query('select e.iden,e.nombre,e.url from enlaces e join usuario u on u.idusuario = e.idusuario join copia c on u.idusuario = c.idusuario where c.idempresa = $1', [userId], (err, result) => {
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

const verenlace = async(req,res)=>{
const iden = req.params.iden
const response = await pool.query('select iden, nombre,url from enlaces where iden = $1',
[
  iden
])
res.status(200).json(response.rows)
}


editarenlace = async(req,res)=>{
const iden = req.params.iden
const {nombre,url} = req.body
const update = await pool.query('update enlaces set nombre = $1, url = $2 where iden = $3',[
  nombre,
  url,
  iden
])
res.json({
  message: 'Producto actualizado sastifactoriamente'
})
}

eliminarenlace = async(req,res)=>{
  const iden = req.params.iden
  const elimina = await pool.query('delete from enlaces where iden = $1',[
    iden
  ])
  res.json({
    message: 'Producto eliminado sastifactoriamente'
  })
}


module.exports = {
    crearEnlaces,
    verEnlaces,
    verEnlacespanel,
    verenlace,
    editarenlace,
    eliminarenlace
}