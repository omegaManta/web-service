const {pool} = require('../db/conexion')

const crearcontacto = async(req,res)=>{
const {nombre,url} = req.body
const guardar = await pool.query('insert into social(nombre,url)values($1,$2)',[
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
    const response = await pool.query('select idred,nombre,url from social')
    res.status(200).json(response.rows)
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
vercontacto,
editarcontacto,
eliminarcontacto
}