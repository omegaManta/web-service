const {pool} = require('../../db/conexion');



const crearobservacion = async(req,res)=>{
const {idempresa,idpedido,comentario} = req.body;
const guarda = pool.query('insert into observacion(idempresa,idpedido,comentario)values($1,$2,$3)',[
    idempresa,
    idpedido,
    comentario
])
res.json({
    message: 'Observacion creada'
})
}



const verobservaciones = async(req,res)=>{
const response = await pool.query('select t.idpedido,o.comentario,t.estado from observacion o join trabajo_realizado t on t.idpedido = o.idpedido')
res.status(200).json(response.rows)
} 


const eliminarobservacion = async(req,res)=>{
const idob = req.params.idob;
const response = await pool.query('delete from observacion where idob = $1',[
    idob
])
res.json({
    message: 'observacion eliminada'
})
}



module.exports = {
    crearobservacion,
    verobservaciones,
    eliminarobservacion
}