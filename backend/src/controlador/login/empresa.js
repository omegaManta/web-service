const {pool} = require('../../db/conexion')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const crearLogin = async(req,res)=>{
    const { email, password } = req.body;
    const response = await pool.query('SELECT * FROM copia WHERE email = $1 and password = $2', 
    [
        email,
        password
    ]);
    
    if (response.rows.length === 0) {
      return res.json({ error: 'Usuario incorrecto' });
    }else{
      const user = response.rows[0];
      const token = jwt.sign({ userId: user.idempresa, nombre_empresa: user.nombre_empresa }, 'sistema omega web');
        res.json({ token });
    }


}



const verperfil = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select c.idempresa, c.ruc, c.email, c.nombre_empresa, c.telefono,c.direccion,c.ciudad,c.contrato,p.nombres_empresa,p.nombre_propietario from copia c join usuario p on c.idusuario = p.idusuario where c.idempresa = $1', [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
        return;
      }

      const userProfile = result.rows[0];
      res.json({ profile: userProfile });
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido' });
  }
}



const verperfilpedidos = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select p.idpedido,s.descripcion, c.nombre_empresa,c.telefono,c.contrato, s.precio, s.duracion,s.foto,p.estado,p.fecha_hora from pedido p join  servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa where c.idempresa = $1 group by p.idpedido,s.descripcion,c.nombre_empresa,c.telefono,c.contrato,s.precio,s.duracion,s.foto,p.estado,p.fecha_hora', [userId], (err, result) => {
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


const verperfiltrabajosrealizados = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select p.idpedido,c.idempresa, c.nombre_empresa,c.telefono,c.contrato, t.nombre_propietario as tecnico_escogido,t.ciudad,t.ruc,p.mensaje as requiere,s.descripcion as servicio, s.precio, s.duracion,s.foto_url, p.estado,p.fecha_hora from trabajo_realizado p join usuario t on t.idusuario = p.idusuario join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa where c.idempresa = $1', [userId], (err, result) => {
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

const verperfilcomentario = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select t.idpedido,o.comentario,t.estado,c.idempresa,c.nombre_empresa,c.ruc,c.direccion,c.contrato,c.email from observacion o join trabajo_realizado t on t.idpedido = o.idpedido join copia c on c.idempresa = t.idempresa where c.idempresa = $1', [userId], (err, result) => {
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




const verperfilvisitas = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select c.nombre_empresa,t.nombres,c.contrato,c.ruc,c.direccion, v.fecha_visita,v.hora_visita from visita v join copia c on c.idempresa = v.idempresa join tecnico t on t.idtecnico = v.idtecnico where v.idempresa = $1', [userId], (err, result) => {
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




const verperfildetalleobservacion = async(req,res)=>{
  const idpedido = req.params.idpedido;
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select o.idob,s.foto_url, t.idpedido,o.comentario,t.mensaje,t.estado,c.idempresa,c.nombre_empresa,c.ruc,c.direccion,c.contrato,c.email,s.descripcion,te.nombre_propietario from observacion o join trabajo_realizado t on t.idpedido = o.idpedido join copia c on c.idempresa = t.idempresa join servicio s on s.idservicio = t.idservicio join usuario te on te.idusuario = t.idusuario where t.idpedido = $1 and c.idempresa = $2 order by o.fecha_hora desc', [idpedido,userId], (err, result) => {
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

const contarpedidos = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select count(*) from pedido where idempresa = $1', [userId], (err, result) => {
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


const contarcompletados = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select count(*) from recibo where idempresa = $1', [userId], (err, result) => {
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




const sumarpedidoscliente = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select sum(s.precio) as valor from pedido p join servicio s on s.idservicio = p.idservicio  where p.idempresa = $1', [userId], (err, result) => {
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



//recibos de clientes
const verecibosclientes = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select c.nombre_empresa,r.recibo,c.idempresa,r.fecha_creacion from recibo r join copia c on c.idempresa = r.idempresa where c.idempresa = $1 order by r.fecha_creacion desc', [userId], (err, result) => {
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



const verecibo = async(req,res)=>{
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sistema omega web');
    const userId = decoded.userId;

    pool.query('select s.descripcion,count(*),sum(s.precio), c.nombre_empresa,c.telefono,c.contrato, s.precio, s.duracion,i.img,p.estado from pedido p  join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa join imgservicio i on s.idservicio = i.idservicio where c.idempresa = $1 group by s.descripcion,c.nombre_empresa,c.telefono,c.contrato,s.precio,s.duracion,i.img,p.estado', [userId], (err, result) => {
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





module.exports = {
    crearLogin,
    verperfil,
    verperfilpedidos,
    verperfiltrabajosrealizados,
    verperfilcomentario,
    verperfildetalleobservacion,
    verperfilvisitas,
    contarpedidos,
    contarcompletados,
    sumarpedidoscliente,
    verecibosclientes,
    verecibo
}
