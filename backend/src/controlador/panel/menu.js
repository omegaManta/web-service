const jwt = require('jsonwebtoken');
const {pool} = require('../../db/conexion');



//menu para el usuario
const crearmenu = async(req,res)=>{
    const {idusuario,opcion,url} =  req.body;

const guarda = pool.query('insert into menu(idusuario,opcion,url)values($1,$2,$3)',[
    idusuario,
    opcion,
    url
])
res.json({
    message: 'Se creo el menu para el usuario'
})
}



const menu = async(req,res)=>{
    const response = await pool.query('select r.rol,u.nombre_propietario,u.ruc,u.direccion,m.opcion,m.url,m.idmenu from rol r join usuario u on r.idrol = u.idrol join menu m on u.idusuario = m.idusuario')
    res.status(200).json(response.rows);
}


const vermenuperfil = async(req,res)=>{
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
  
       pool.query('select r.rol,u.nombre_propietario,u.ruc,u.direccion,m.opcion,m.url from rol r join usuario u on r.idrol = u.idrol join menu m on u.idusuario = m.idusuario where u.idusuario = $1', [userId], (err, result) => {
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


const eliminarmenu = async(req,res)=>{
  const idmenu = req.params.idmenu;
  const eliminar = await pool.query('delete from menu where idmenu = $1',[
   idmenu
  ])
  res.json({
    message: 'Menu eliminado'
  })
}




module.exports = {
    crearmenu,
    menu,
    vermenuperfil,
    eliminarmenu
}