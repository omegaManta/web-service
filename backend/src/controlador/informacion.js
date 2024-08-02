const {pool} = require('../db/conexion');
const jwt = require('jsonwebtoken');


const crearcontacto = async(req,res)=>{
const {idusuario,nombre,url} = req.body
const guardar = await pool.query('insert into social(idusuario,nombre,url)values($1,$2,$3)',[
    idusuario,
    nombre,
    url
])
res.json({
    message: 'Contacto creado sastifactoriamente',
    body: {
        social: {nombre,url}
    }
})
}


const vercontactos = async(req,res)=>{
    const token = req.headers.authorization;
      
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
    
    try {
      const decoded = jwt.verify(token, 'sistema omega web');
      const userId = decoded.userId;
    
      pool.query('select s.idred,s.nombre,s.url from social s join usuario u on u.idusuario = s.idusuario join copia c on u.idusuario = c.idusuario where c.idempresa = $1', [userId], (err, result) => {
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


const vercontactospanel = async(req,res)=>{
    const token = req.headers.authorization;
      
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
    
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
    
      pool.query('select s.idred,s.nombre,s.url from social s join usuario u on u.idusuario = s.idusuario where u.idusuario = $1', [userId], (err, result) => {
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


const vercontacto = async(req,res)=>{
    const idred = req.params.idred
    const response = await pool.query('select idred,nombre,url from social where idred = $1',[
        idred
    ])
    res.status(200).json(response.rows)
}


const editarcontacto = async(req,res)=>{
    const idred = req.params.idred
    const {nombre,url} = req.body
    const editar = await pool.query('update social set nombre = $1, url = $2 where idred = $3',[
        nombre,
        url,
        idred
    ])
    res.json({
        message: 'Contacto editado sastifactoriamente'
    })
}



const eliminarcontacto = async(req,res)=>{
    const idred = req.params.idred
    const eliminar = await pool.query('delete from social where idred = $1',[
        idred
    ])
    res.json({
    message: 'Contacto eliminado sastifactoriamente'
    })
}

module.exports = {
crearcontacto,
vercontactos,
vercontactospanel,
vercontacto,
editarcontacto,
eliminarcontacto
}