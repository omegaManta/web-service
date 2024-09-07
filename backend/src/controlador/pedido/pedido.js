const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {pool} = require('../../db/conexion');
const jwt = require('jsonwebtoken');
const upload = multer({dest: 'uploads'});



//trabajos pedidos
const crearpedido = async(req,res)=>{
    const {idempresa,idservicio,cantidad} = req.body;
    const guardar = await pool.query('insert into pedido(idempresa,idservicio,cantidad)values($1,$2,$3)',
    [
        idempresa,
        idservicio,
        cantidad
    ])
    res.json({
        message: 'Pedido creado sastifactoriamente',
        body:{
            pedido:{idservicio}
        }
    })
    }


const verpedidos = async(req,res)=>{
const response = await pool.query('select c.idempresa,s.idservicio, p.idpedido,c.ruc, c.email as correo,c.nombre_empresa,c.telefono as celular,s.descripcion as servicio, s.precio, s.foto,p.estado,p.fecha_hora from pedido p  join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa join imgservicio i on s.idservicio = i.idservicio order by i.fecha_hora desc limit 1')
res.status(200).json(response.rows);
}


const verpedido = async(req,res)=>{
    const idpedido = req.params.idpedido;
    const response = await pool.query('select c.idempresa,s.idservicio, p.idpedido,c.ruc, c.email as correo,c.nombre_empresa,c.telefono as celular,s.descripcion as servicio, s.precio, s.foto,p.estado,p.fecha_hora from pedido p join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa where p.idpedido = $1',[
        idpedido
    ])
    res.status(200).json(response.rows);
    }


const solicitudpedidos = async(req,res)=>{
const nombres = req.params.nombres;
const response = await pool.query('select p.idpedido,c.idempresa,c.ruc, c.nombre_empresa,c.email as correo,c.telefono as celular,s.descripcion as servicio, s.precio, s.foto,s.idservicio,p.estado,p.fecha_hora from pedido p join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa where nombres like $1',[
    nombres + '%'
])
res.status(200).json(response.rows);
}


const eliminarpedido = async(req,res)=>{
const idempresa = req.params.idempresa;
const elimina = await pool.query('delete from pedido where idempresa = $1',[
    idempresa
])
res.json({
    message: 'Pedido eliminado'
})
}


const eliminarpedir = async(req,res)=>{
    const idpedido = req.params.idpedido;
    const elimina = await pool.query('delete from pedido where idpedido = $1',[
        idpedido
    ])
    res.json({
        message: 'Pedido eliminado'
    })
    }

//Trabajos realizados
const creartrabajorealizado = async(req,res)=>{
    const {idempresa,idusuario,idservicio,mensaje} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path,{
        folder: 'firmas-check'
    })
    const firmaUrl= result.secure_url;
    const guardar = await pool.query('insert into trabajo_realizado(idempresa,idusuario,idservicio,mensaje,firma)values($1,$2,$3,$4,$5)',
    [
        idempresa,
        idusuario,
        idservicio,
        mensaje,
        firmaUrl
    ])
    res.json({
        message: 'Trabajo ralizado sastifactoriamente',
        body:{
            pedido:{idusuario,idservicio,mensaje}
        }
    })
}


const vertrabajosrealizados = async(req,res)=>{
   const response = await pool.query('select p.idpedido,c.ruc, c.nombre_empresa,c.contrato,p.firma, t.nombre_propietario as tecnico_escogido,c.telefono,t.ciudad,p.mensaje as requiere,s.descripcion as servicio, s.precio, s.duracion,p.estado,p.fecha_hora,s.foto_url,o.comentario from trabajo_realizado p join usuario t on t.idusuario = p.idusuario join servicio s on s.idservicio = p.idservicio join observacion o on p.idpedido = o.idpedido join copia c on c.idempresa = p.idempresa order by o.fecha_hora desc')
   res.status(200).json(response.rows);
} 



const buscartrabajorealizado = async (req, res) => {
    const token = req.headers.authorization;
    const nombre_empresa = req.params.nombre_empresa;
      
    if (!token) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
    
    try {
      const decoded = jwt.verify(token, 'panel omega web');
      const userId = decoded.userId;
      const nombreEmpresaLike = `${nombre_empresa}%`;
  
      pool.query(
        'SELECT c.nombre_empresa, r.recibo, r.fecha_creacion ' +
        'FROM recibo r ' +
        'JOIN copia c ON c.idempresa = r.idempresa ' +
        'JOIN usuario u ON u.idusuario = c.idusuario ' +
        'WHERE u.idusuario = $1 AND c.nombre_empresa ILIKE $2',
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
  };
  



//visita del tecnico escogido
const crearvisita = async(req,res)=>{
const {idempresa,idpedido,idtecnico,
idservicio,fecha_visita,hora_visita} = req.body;
const guarda = await pool.query('insert into visita(idempresa,idpedido,idtecnico,idservicio,fecha_visita,hora_visita) values($1,$2,$3,$4,$5,$6)',[
    idempresa,idpedido,idtecnico,idservicio,fecha_visita,
    hora_visita
])
res.json({
    message: 'Visita creada'
})
}


const visitas = async(req,res)=>{
    const response = await pool.query('select c.nombre_empresa,t.nombres,c.contrato,c.ruc,c.direccion, v.fecha_visita,v.hora_visita from visita v join copia c on c.idempresa = v.idempresa join tecnico t on t.idtecnico = v.idtecnico')
    res.status(200).json(response.rows);
}


const visita = async(req,res)=>{
    const idpedido = req.params.idpedido;
    const response = await pool.query('select c.direccion,c.idempresa,t.idtecnico,s.idservicio, p.idpedido,c.ruc, c.email as correo,c.nombre_empresa,c.telefono as celular,c.contrato, t.nombres as tecnico_escogido,t.email,t.telefono,t.ciudad,t.cedula,p.mensaje,s.descripcion as servicio, s.precio, s.duracion,s.foto_url,p.estado,p.fecha_hora from pedido p join tecnico t on t.idtecnico = p.idtecnico join servicio s on s.idservicio = p.idservicio join copia c on c.idempresa = p.idempresa  where p.idpedido = $1',[
        idpedido
    ])
    res.status(200).json(response.rows);
}


const updatecantidadprecio = async(req,res) => {
    const idservicio = req.params.idservicio;
    const {precio,cantidad} = req.body;
    var qty = parseInt(cantidad);
    var nuevoprecio = precio * qty;
    const update = await pool.query('update servicio set precio = $1 where idservicio = $2',[
      nuevoprecio,
      idservicio
      ])
      res.json({
        message: 'Producto actualizado sastifactoriamente'
      })
      const update2 = await pool.query('update pedido set cantidad = $1 where idservicio = $2',[
        qty,
        idservicio
        ])
        res.json({
          message: 'Producto actualizado sastifactoriamente'
        }) 
}


module.exports = {
    crearpedido,
    verpedidos,
    verpedido,
    solicitudpedidos,
    eliminarpedido,
    creartrabajorealizado,
    vertrabajosrealizados,
    buscartrabajorealizado,
    crearvisita,
    visitas,
    visita,
    eliminarpedir,
    updatecantidadprecio
}