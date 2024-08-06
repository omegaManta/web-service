const jwt = require('jsonwebtoken');
const {pool} = require('../../db/conexion');
const { response } = require('express');



const crearol = async(req,res)=>{
const {rol} = req.body;
const guarda = await pool.query('insert into rol(rol)values($1)',[
    rol
]); 
res.json({
    message: 'Rol creado'
});
}



const verroles = async(req,res)=>{
 const response = await pool.query('select idrol, rol from rol'); 
 res.status(200).json(response.rows);
}



const crearusuario = async(req,res)=>{
    const {idrol,ruc,email,
        telefono,direccion,nombre_propietario,empresa,contacto,ciudad
        ,password} = req.body;
    const guarda = await pool.query('insert into usuario(idrol,ruc,email,telefono,direccion,nombre_propietario,empresa,contacto,ciudad,password)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[
        idrol,
        ruc,
        email,
        telefono,
        direccion,
        nombre_propietario,
        empresa,
        contacto,
        ciudad,
        password
    ]);
    res.json({
        message: 'Usuario creado'
    });
}



const verusuarios = async(req,res)=>{
    const response = await pool.query('select * from usuario u join rol r on r.idrol = u.idrol');
    res.status(200).json(response.rows);
}



const login = async(req,res)=>{
    const { email, password } = req.body;
    const response = await pool.query('SELECT * FROM usuario WHERE email = $1 and password = $2', 
    [
        email,
        password
    ]);
    
    if (response.rows.length === 0) {
      return res.json({ error: 'Usuario incorrecto' });
    }else{
      const user = response.rows[0];
      const token = jwt.sign({ userId: user.idusuario, nombre_propietario: user.nombre_propietario}, 'panel omega web');
        res.json({ token });
    }
}




const verperfil = async (req, res) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'panel omega web');
    const userId = decoded.userId;

    const result = await pool.query('select c.idusuario,r.rol, c.ruc, c.email, c.nombre_propietario,c.empresa, c.telefono,c.direccion,c.ciudad from usuario c inner join rol r on r.idrol = c.idrol  where c.idusuario = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil de usuario no encontrado' });
    }

    const userProfile = result.rows[0];
    return res.json({ profile: userProfile });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};


const verperfilconfiguracion = async (req, res) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'panel omega web');
    const userId = decoded.userId;

    const result = await pool.query('select n.idname,n.color,n.color_fuente,n.mision,n.vision,c.idusuario,r.rol, c.ruc, c.email, c.nombre_propietario,c.empresa, c.telefono,c.direccion,c.ciudad from usuario c inner join rol r on r.idrol = c.idrol join nombres_empresa n on c.idusuario = n.idusuario  where c.idusuario = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil de usuario no encontrado' });
    }

    const userProfile = result.rows[0];
    return res.json({ profile: userProfile });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};



//tecnicos
const verpedidotecnico = async(req,res)=>{
  const idempresa = req.params.idempresa;
  const response = await pool.query('select s.descripcion,count(*),sum(s.precio), c.nombre_empresa,c.telefono,c.contrato, s.precio, s.duracion,s.foto_url,p.estado from pedido p  join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa where c.idempresa = $1 group by s.descripcion,c.nombre_empresa,c.telefono,c.contrato,s.precio,s.duracion,s.foto_url,p.estado',[
    idempresa
  ]);
  res.status(200).json(response.rows);
}


const verclientesatecnico = async(req,res)=>{
  const response = await pool.query('select c.idempresa,c.nombre_empresa from pedido p join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa group by c.idempresa,c.nombre_empresa');
    res.status(200).json(response.rows);
}

//clientes
const verfacturacliente = async(req,res) => {
  const idempresa = req.params.idempresa;
  const response = await pool.query('select * from copia where idempresa = $1',[
    idempresa
  ]);
  res.status(200).json(response.rows);
}


const sumartotalpedido = async(req,res)=>{
  const idempresa = req.params.idempresa;
  const response = await pool.query('select sum(s.precio) from pedido p join servicio s on s.idservicio = p.idservicio where p.idempresa = $1',[
    idempresa
  ]);
  res.status(200).json(response.rows);
}





const verusuario = async(req,res)=>{
  const idusuario = req.params.idusuario;
  const ver = await pool.query('select * from usuario where idusuario = $1',[
    idusuario
  ])
  res.status(200).json(ver.rows);
}



const editarusuario = async(req,res)=> {
  const idusuario = req.params.idusuario;
  const {idrol,ruc,email,
    telefono,direccion,nombre_propietario,empresa,contacto,ciudad
    ,password} = req.body;
    const edicion = await pool.query('update usuario set idrol = $1, ruc = $2, email = $3, telefono = $4, direccion = $5, nombre_propietario = $6,empresa = $7, contacto = $8,ciudad = $9,password = $10 where idusuario = $11',[
      idrol,
      ruc,
      email,
      telefono,
      direccion,
      nombre_propietario,
      empresa,
      contacto,
      ciudad,
      password,
      idusuario
 ])
 res.json({
     message:'Usuario actualizado sastifactoriamente'
 })
}

const eliminarususario = async(req,res) => {
  const idusuario = req.params.idusuario;
  const elimina = await pool.query('delete from usuario where idusuario = $1',[
    idusuario
  ])
  res.json({
    message: 'Usuario eliminado'
  })
}



module.exports = {
    crearol,
    verroles,
    crearusuario,
    verusuarios,
    login,
    verperfil,
    verpedidotecnico,
    editarusuario,
    verusuario,
    verfacturacliente,
    verclientesatecnico,
    sumartotalpedido,
    eliminarususario,
    verperfilconfiguracion
}

