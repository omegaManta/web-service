const {pool} = require('../../db/conexion');
const jwt = require('jsonwebtoken');





const crearfavorito = async(req,res) => {
const {idempresa,idservicio} = req.body;
const guardar = await pool.query('insert into favorito(idempresa,idservicio)values($1,$2)',[
    idempresa,
    idservicio
])
res.json(
 {
    message: 'Deseo creado'
 }
)
}


const verperfildeseos = async(req,res)=>{
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'sistema omega web');
      const userId = decoded.userId;
  
      pool.query('select s.foto_url,s.descripcion from favorito fa join servicio s on s.idservicio = fa.idservicio join copia c on c.idempresa = fa.idempresa where c.idempresa = $1 group by s.foto_url,s.descripcion', [userId], (err, result) => {
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





module.exports = {
    crearfavorito,
    verperfildeseos
}