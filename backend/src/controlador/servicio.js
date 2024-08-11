const multer = require('multer');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../db/conexion');

const upload = multer({ dest: 'uploads' });

//servicios
const crearservicio = async(req,res)=>{
        try {
            const result = await cloudinary.uploader.upload(req.file.path,{
                resource_type: 'auto',
                folder: 'servicios'
            })
            const fotoUrl = result.secure_url;
            const {idcategoria,descripcion,precio} = req.body;
            const precioinicial = parseFloat(precio);
            var op1 = precioinicial * 2.9;
            var op2 = op1 / 100;
            var op3 = op2 + 0.30;
            var transaccion = op3 + precioinicial;
            const guardar = await pool.query('insert into servicio(idcategoria,foto,descripcion,precio)values($1,$2,$3,$4)',[       
                idcategoria,
                fotoUrl,
                descripcion,
                transaccion
            ])
            res.status(200).json(result)
        } catch (error) {
          console.error(error);
          res.status(400).send(error.message);
        }
}


const buscarServicio= async(req,res)=>{
const token = req.headers.authorization;
const descripcion = req.params.descripcion;
  
if (!token) {
  res.status(401).json({ error: 'Token no proporcionado' });
  return;
}

try {
  const decoded = jwt.verify(token, 'sistema omega web');
  const userId = decoded.userId;
  const nombreEmpresaLike = `${descripcion}%`;

  pool.query(
    'SELECT  c.descripcion as categoriadescripcion,s.idservicio, s.descripcion,s.precio,s.foto ' +
    'FROM servicio s join categoria c on c.idcategoria = s.idcategoria join usuario u on u.idusuario = c.idusuario ' +
    'join copia e on u.idusuario = e.idusuario '+
    'WHERE e.idempresa = $1 AND s.descripcion ILIKE $2 ',
    [userId, nombreEmpresaLike],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
        return;
      }

      const userProfile = result.rows;
      res.json({ profile: userProfile });
    }
  );
} catch (error) {
  console.error(error);
  res.status(401).json({ error: 'Token inválido' });
}
}



const detalleservicio = async(req,res)=>{
    const idservicio = req.params.idservicio;
    const respuesta = await pool.query('select c.idcategoria, c.descripcion as categoriadescripcion,s.idservicio, s.descripcion,s.precio,s.foto,t.video from servicio s join categoria c on c.idcategoria = s.idcategoria join tutorial t on s.idservicio = t.idservicio where s.idservicio = $1 order by t.fecha_hora desc limit 1',[
        idservicio
    ])
    res.status(200).json(respuesta.rows);
    }

const verserviciospanel = async(req,res) => {
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
  
      pool.query('select s.idservicio, c.idcategoria, c.descripcion as categoria, s.descripcion,s.foto,s.precio from categoria c join usuario u on u.idusuario = c.idusuario join servicio s on c.idcategoria = s.idcategoria where u.idusuario = $1', [userId], (err, result) => {
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

const verServicios = async(req,res)=>{
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'sistema omega web');
      const userId = decoded.userId;
  
      pool.query('select s.idservicio,s.idcategoria, s.descripcion, s.precio, s.foto from servicio s join categoria c on c.idcategoria = s.idcategoria join usuario u on u.idusuario = c.idusuario join copia cl on u.idusuario = cl.idusuario where cl.idempresa = $1', [userId], (err, result) => {
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




const verinicial = async(req,res)=>{
    res.send('Bienvenido a mi servidor en la nube')
    }


const verservicio = async(req,res)=>{
const idservicio = req.params.idservicio
const response = await pool.query('select s.idservicio, s.idcategoria,s.descripcion,s.precio,s.foto from servicio where idservicio = $1',[
    idservicio
])
res.status(200).json(response.rows)
}


const editarServicio = async (req, res) => {
    try {
      let imageUrl = req.body.foto_url; // Inicialmente, conservamos la misma imagen
  
      // Verificamos si se está cargando una nueva imagen
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Servicios'
        });
        imageUrl = result.secure_url;
      }
  
      const { idservicio, idcategoria, descripcion, precio, duracion } = req.body;
  
      // Actualizamos los datos del servicio en la base de datos
      const editar = await pool.query(
        'UPDATE servicio SET idcategoria = $1, foto_url = $2, descripcion = $3, precio = $4, duracion = $5 WHERE idservicio = $6',
        [idcategoria, imageUrl, descripcion, precio, duracion, idservicio]
      );
      res.status(200).json({ message: 'Servicio actualizado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  };


eliminarservicio = async(req,res)=>{
const idservicio = req.params.idservicio;
const eliminar = await pool.query('delete from servicio where idservicio = $1',[
    idservicio
])
res.json({
    message: 'Servicio eliminado sastifactorimente'
})
}


const contarservicios = async(req,res)=>{
    const response = await pool.query('select count(*) from servicio')
    res.status(200).json(response.rows);
}



//categorias
crearcategoria = async(req,res)=>{
const {idusuario,descripcion} = req.body;
const guardar = await pool.query('insert into categoria(idusuario,descripcion)values($1,$2)',[
    idusuario,
    descripcion
])
res.json({
    message: 'categoria creada',
    body:{
        servicio:{descripcion}
    }
})
}

//ver categorias por panel de los propietarios
const verpanelcategorias = async(req,res)=>{
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
  
      pool.query('select c.idcategoria, c.descripcion from categoria c join usuario u on u.idusuario = c.idusuario where u.idusuario = $1', [userId], (err, result) => {
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
  

vercategorias = async(req,res)=>{
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'sistema omega web');
      const userId = decoded.userId;
  
      pool.query('select c.idcategoria, c.descripcion from categoria c join usuario u on u.idusuario = c.idusuario join copia cl on u.idusuario = cl.idusuario where cl.idempresa = $1', [userId], (err, result) => {
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

const muestracategoria = async(req,res)=>{
const idcategoria = req.params.idcategoria;
const response = await pool.query('select c.idcategoria,c.descripcion as categoria, s.idservicio, s.descripcion, s.precio,s.foto from categoria c join servicio s on c.idcategoria = s.idcategoria where c.idcategoria = $1 ',[
    idcategoria
])
res.status(200).json(response.rows);
}


vercategoria = async(req,res)=>{
    const idcategoria = req.params.idcategoria;
    const response = await pool.query('select idcategoria,idusuario, descripcion from categoria where idcategoria = $1',[
        idcategoria
    ])
    res.status(200).json(response.rows)
}



editarcategoria = async(req,res)=>{
    const idcategoria = req.params.idcategoria;
const {idusuario,descripcion} = req.body;
const edicion = await pool.query('update categoria set idusuario = $1, descripcion = $2 where idcategoria = $3',[
     idusuario, 
     descripcion,
     idcategoria
])
res.json({
    message:'Categoria actualizada sastifactoriamente'
})
}


eliminarcategoria = async(req,res)=>{
const idcategoria = req.params.idcategoria;
const eliminar = await pool.query('delete from categoria where idcategoria = $1',[
    idcategoria
])
res.json({
    message: 'Categoria eliminada sastifactorimente'
})
}


module.exports = {
    buscarServicio,
    verServicios,
    crearservicio,
    crearcategoria,
    vercategorias,
    vercategoria,
    editarcategoria,
    eliminarcategoria,
    muestracategoria,
    verservicio,
    editarServicio,
    eliminarservicio,
    detalleservicio,
    contarservicios,
    verinicial,
    verpanelcategorias,
    verserviciospanel
}