const {pool} = require('../../db/conexion')



const creartecnico = async(req,res)=>{
const {nombres,cedula,email,telefono,ciudad} = req.body;
const guardar = await pool.query('insert into tecnico(nombres,cedula,email,telefono,ciudad)values($1,$2,$3,$4,$5)',[
  nombres,
  cedula,
  email,
  telefono,
  ciudad  
])
res.json({
    message: 'tecnico creado sastifactoriamente',
    body:{
        tecnico: {nombres,cedula,telefono}
    }
})
}


vertecnicos = async(req,res)=>{
const response = await pool.query(`select idusuario,nombre_propietario,ruc,email,telefono,ciudad from usuario u join rol r on r.idrol = u.idrol where r.rol ='tecnico' `)
res.status(200).json(response.rows)
}



vertecnico = async(req,res) => {
    const idtecnico = req.params.idtecnico
    const response = await pool.query('select idtecnico, nombres,cedula,email,telefono,ciudad from tecnico where idtecnico = $1',[
        idtecnico
    ])
    res.status(200).json(response.rows)
}


editartecnico = async(req,res)=>{
    const idtecnico = req.params.idtecnico;
const {nombres,cedula,email,telefono,ciudad} = req.body;
const edicion = await pool.query('update tecnico set nombres = $1, cedula = $2, email = $3, telefono = $4, ciudad = $5 where idtecnico = $6',[
     nombres,
     cedula,
     email,
     telefono,
     ciudad,
     idtecnico
])
res.json({
    message:'Tecnico actualizado sastifactoriamente'
})
}


eliminartecnico = async(req,res)=>{
const idtecnico = req.params.idtecnico;
const eliminar = await pool.query('delete from tecnico where idtecnico = $1',[
    idtecnico
])
res.json({
    message: 'Tecnico eliminado sastifactorimente'
})
}



module.exports = {
    creartecnico,
    vertecnicos,
    vertecnico,
    editartecnico,
    eliminartecnico
}