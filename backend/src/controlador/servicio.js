const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../db/conexion');

const upload = multer({ dest: 'uploads' });

//servicios
const crearservicio = async(req,res)=>{
const {idcategoria,descripcion,precio,duracion} = req.body;
 const guardar = await pool.query('insert into servicio(idcategoria,idusuario,descripcion,precio,duracion)values($1,$2,$3,$4)',[
            idcategoria,
            descripcion,
            precio,
            duracion
        ])
        res.json({
            message: 'Servicio creado sastifactoriamente'
        })
}


const buscarServicio= async(req,res)=>{
const descripcion = req.params.descripcion;
const respuesta = await pool.query('select c.descripcion as categoriadescripcion,s.idservicio, s.descripcion,s.precio,s.duracion,i.img from servicio s join categoria c on c.idcategoria = s.idcategoria join imgservicio i on s.idservicio = i.idservicio where s.descripcion like $1 order by i.fecha_hora desc limit 1',[
    descripcion + '%'
])
res.status(200).json(respuesta.rows);
}



const detalleservicio = async(req,res)=>{
    const idservicio = req.params.idservicio;
    const respuesta = await pool.query('select c.idcategoria, c.descripcion as categoriadescripcion,s.idservicio, s.descripcion,s.precio,s.duracion,i.img,t.video from servicio s join categoria c on c.idcategoria = s.idcategoria join tutorial t on s.idservicio = t.idservicio join imgservicio i on s.idservicio = i.idservicio where s.idservicio = $1 order by t.fecha_hora desc limit 1',[
        idservicio
    ])
    res.status(200).json(respuesta.rows);
    }


const verServicios = async(req,res)=>{
const respuesta = await pool.query('select s.idservicio,s.idcategoria, s.descripcion, s.duracion, s.precio, s.foto, c.descripcion as categoriadescripcion from servicio s join categoria c on c.idcategoria = s.idcategoria')
res.status(200).json(respuesta.rows);
}



const verinicial = async(req,res)=>{
    res.send('Bienvenido a mi servidor en la nube')
    }


const verservicio = async(req,res)=>{
const idservicio = req.params.idservicio
const response = await pool.query('select s.idservicio, s.idcategoria,s.descripcion,s.precio,s.duracion from servicio s join imgservicio i on s.idservicio = i.idservicio where idservicio = $1',[
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
const {descripcion} = req.body;
const guardar = await pool.query('insert into categoria(descripcion)values($1)',[
    descripcion
])
res.json({
    message: 'categoria creada',
    body:{
        servicio:{descripcion}
    }
})
}

vercategorias = async(req,res)=>{
    const response = await pool.query('select idcategoria,descripcion from categoria')
    res.status(200).json(response.rows)
}

const muestracategoria = async(req,res)=>{
const idcategoria = req.params.idcategoria;
const response = await pool.query('select c.idcategoria,c.descripcion as categoria, s.idservicio, s.descripcion, s.duracion, s.precio,s.foto from categoria c join servicio s on c.idcategoria = s.idcategoria where c.idcategoria = $1 ',[
    idcategoria
])
res.status(200).json(response.rows);
}


vercategoria = async(req,res)=>{
    const idcategoria = req.params.idcategoria;
    const response = await pool.query('select idcategoria, descripcion from categoria where idcategoria = $1',[
        idcategoria
    ])
    res.status(200).json(response.rows)
}



editarcategoria = async(req,res)=>{
    const idcategoria = req.params.idcategoria;
const {descripcion} = req.body;
const edicion = await pool.query('update categoria set descripcion = $1 where idcategoria = $2',[
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
    verinicial
}