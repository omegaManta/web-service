const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion');


const upload = multer({ dest: 'uploads' });

//identificacion para la empresa
const crearidentificacion = async(req,res)=>{
    try {
        const {nombre,mision,vision} = req.body;
        const guardar = await pool.query('insert into nombres_empresa(nombre,mision,vision)values($1,$2,$3)',[
            nombre,
            mision,
            vision
        ])
      res.json({
        message: 'Identificacion de empresa creada'
      })
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
}



const mostraridentificacionunica = async(req,res)=>{
    const response = await pool.query('select n.idname,n.nombre, l.logo from nombres_empresa n inner join logo_empresa l on n.idname = l.idname order by l.fecha_hora desc limit 1')
    res.status(200).json(response.rows);
}

const mostrartodo = async(req,res)=>{
    const response = await pool.query('select idname,nombre,mision,vision from nombres_empresa')
    res.status(200).json(response.rows);
}


const eliminarnombre = async(req,res)=>{
    const idname = req.params.idname;
    const eliminar = await pool.query('delete from nombres_empresa where idname = $1',[
        idname
    ])
    res.json({
        message: 'Nombre de empresa eliminado sastifactorimente'
    })
    }


//logo para la empresa
const crearlogo = async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.file.path,{
        resource_type: 'video',
        folder: 'empresas'
    })
    const logoUrl = result.secure_url;
    const {idname} = req.body;
    const guarda = await pool.query('insert into logo_empresa(idname,logo)values($1,$2)',[
        idname,
        logoUrl
    ])
    res.status(200).json(result);
}


const mostrarlogos = async(req,res)=>{
const response = await pool.query('select l.idlogo,l.logo,n.nombre, n.mision,n.vision from logo_empresa l inner join nombres_empresa n on n.idname = l.idname')
res.status(200).json(response.rows)
}



const eliminarlogo = async(req,res)=>{
    const idlogo = req.params.idlogo;
    const eliminar = await pool.query('delete from logo_empresa where idlogo = $1',[
        idlogo
    ])
    res.json({
        message: 'Logo de empresa eliminado sastifactorimente'
    })
    }




module.exports = {
    crearidentificacion,
    mostraridentificacionunica,
    mostrartodo,
    eliminarnombre,
    mostrarlogos,
    crearlogo,
    eliminarlogo
}