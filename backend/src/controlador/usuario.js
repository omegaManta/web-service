const {pool} = require('../db/conexion')



const verUser = async(req,res)=>{
const ver = await pool.query('select * from usuario')
res.status(200).json(ver.rows)
}


const crearUser = async(req,res)=>{
 const {email,password} = req.body;
 const insersion = await pool.query('insert into usuario(email,password) values($1,$2)',[
    email,
    password
 ])
 res.json({
    message:'Usuario creado sastifactoriamente',
    body:{email,password}
 })
}




module.exports = {
    verUser,
    crearUser
}
