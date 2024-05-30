const {pool} = require('../db/conexion')




const crearEnlaces = async(req,res)=>{
const {nombre,url} = req.body;
const guarda = await pool.query('insert into enlaces(nombre,url)values($1,$2)',[
  nombre,
  url
])
res.json({
  message: 'Producto creado sastifactoriamente',
  body:{
      enlaces:{nombre,url}
  }
})
}



const verEnlaces = async(req,res)=>{
const respuesta = await 
pool.query('select iden,nombre,url from enlaces')
res.status(200).json(respuesta.rows);
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
    verenlace,
    editarenlace,
    eliminarenlace
}