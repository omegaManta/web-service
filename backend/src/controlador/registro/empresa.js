const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const {pool} = require('../../db/conexion')


const upload = multer({dest: 'uploads'})


const crearCuenta = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'contrato-firmados',
    });
    const pdfUrl = result.secure_url;

    const { ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario } = req.body;

    const dominio = 'https://factura.omegas-apps.com/panel/welcome/autorizar'
    
    // Configuración del transporte para NodeMailer (Hotmail/Outlook)
    const transporter = nodemailer.createTransport({
      host: "mail.omegas-apps.com",
      pool: true,
      secure: false,
      port: 587,
      auth: {
        user: "notificaciones@omegas-apps.com",
        pass: "N0t1f1c@c10nes*2024"
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      maxConnections: 100,
      maxMessages: 100,
      authMethod: 'LOGIN',
      requireTLS: true,
      // no not send more than 5 messages in a second
      rateLimit: 1
      // service: 'hotmail',
      // auth: {
      //   user: 'omega_manta@hotmail.com',
      //   pass: 'bebe2013',
      // },
    });

    // Configuración del correo electrónico
    const mailOptions = {
      from: 'notificaciones@omegas-apps.com',
      to: 'omega_manta@hotmail.com',
      subject: 'Cliente por aceptar '+nombre_empresa+ ' con ruc ' +ruc,
      html:
       ' Para cuestiones de cumplimiento normativo de la empresa se adjunta el contrato del cliente con intencion de suscribirse' 
       +'<br/> <a src="cid:pdf"></a> <br/>'
       +'Por favor vaya al panel para aceptar la empresa ',
    attachments: [
    {
      filename: 'contrato.pdf',
      path: pdfUrl,
      cid: 'pdf'
    }
  ]
    };

   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado con éxito:', info.response);

        // Guardar la empresa en la base de datos
        const guarda = pool.query(
          'INSERT INTO empresa (ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario, contrato) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario, pdfUrl]
        );

        // Responder al cliente que todo fue exitoso
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.error('Error en la función crearCuenta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};






const getSolicitudes = async(req,res)=>{
const nombre_empresa = req.params.nombre_empresa; 
const respuesta = await pool.query('SELECT * FROM usuario p join empresa e on p.idusuario = e.idusuario where nombre_empresa like $1',[
    nombre_empresa + '%'
])
res.status(200).json(respuesta.rows);
}


const crearSolicitud = async(req,res)=>{
  const {ruc,email,telefono,
  direccion,
  nombre_empresa,
  contacto,
  fecha_ingreso,
  ciudad,
  password,
  idusuario,contrato
  } = req.body;
const dominio = 'https://e-commerce-mjyp3g1li-adriano-parrales-projects.vercel.app/'

  
  // Configuración del transporte para NodeMailer (Hotmail/Outlook)
  const transporter = nodemailer.createTransport({
    host: "mail.omegas-apps.com",
    pool: true,
    secure: false,
    port: 587,
    auth: {
      user: "notificaciones@omegas-apps.com",
      pass: "N0t1f1c@c10nes*2024"
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: true,
    maxConnections: 100,
    maxMessages: 100,
    authMethod: 'LOGIN',
    requireTLS: true,
    // no not send more than 5 messages in a second
    rateLimit: 1
    // service: 'hotmail',
    // auth: {
    //   user: 'omega_manta@hotmail.com',
    //   pass: 'bebe2013',
    // },
  });

  // Configuración del correo electrónico
  const mailOptions = {
    from: 'notificaciones@omegas-apps.com',
    to: email,
    subject: 'Cliente '+nombre_empresa+ ' aceptado',
    text: 'Gracias por preferirnos....... puede iniciar sesion al siguiente link: '
    +dominio,
  };

 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);

      // Guardar la empresa en la base de datos
      const guarda = pool.query(
        'INSERT INTO copia(ruc, email, telefono, direccion, nombre_empresa, contacto,fecha_ingreso, ciudad, password, idusuario, contrato) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)',
        [ruc, email, telefono, direccion, nombre_empresa, contacto,fecha_ingreso, ciudad, password, idusuario, contrato]
      );

      // Responder al cliente que todo fue exitoso
      res.status(200).json({ success: true });
    }
  });
  

  }





        const eliminarEmpresa = async(req,res)=>{
            const idEmpresa = req.params.idEmpresa;
            const eliminacion = await pool.query('delete from empresa where idEmpresa = $1',
            [
                idEmpresa
            ])
            res.json({
                body:{
                    message: 'solicitud eliminada correctamente'
                }
            })
            }
            
            
            
            
           const ver = async(req,res)=> {
            const datosEmpresa = await pool.query('SELECT * FROM planes p join empresa e on p.idplan = e.idplan');
            res.status(200).json(datosEmpresa.rows)
            }
       

            
const veraceptados = async(req,res)=>{
  const response = await pool.query('select d.idEmpresa, d.ruc, d.email, d.telefono, d.direccion, d.nombre_empresa, d.contacto, d.ciudad, d.password, d.idusuario,d.fecha_ingreso,d.contrato, p.nombres_empresa from usuario p join copia d on p.idusuario = d.idusuario')
  res.status(200).json(response.rows)
}

const buscaraceptados = async(req,res)=>{
  const nombre_empresa = req.params.nombre_empresa
  const response = await pool.query('select d.idEmpresa, d.ruc, d.email, d.telefono, d.direccion, d.nombre_empresa, d.contacto, d.ciudad, d.password, d.idplan,d.fecha_ingreso, p.nombres_empresa,d.contrato from usuario p join copia d on p.idusuario = d.idusuario where nombre_empresa like $1',[
    nombre_empresa + '%'
  ])
  res.status(200).json(response.rows)
}

const desactivarcliente = async(req,res)=>{
const idEmpresa = req.params.idEmpresa
const eliminar = await pool.query('delete from copia where idEmpresa = $1',[
  idEmpresa
])
res.json({
  message: 'Se desactivo el cliente sastifactoriamente'
})
}


const vercliente = async(req,res)=>{
  const idEmpresa = req.params.idEmpresa
  const response = await pool.query('select idEmpresa,ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idplan from copia where idEmpresa = $1',[
    idEmpresa
  ])
  res.status(200).json(response.rows)
}


const actualizarcliente = async(req,res)=>{
const idEmpresa = req.params.idEmpresa
const {ruc,email,telefono,direccion,nombre_empresa,
contacto,
ciudad,
password,
idplan} = req.body
const actualizar = await pool.query('update copia set ruc = $1, email = $2, telefono = $3, direccion = $4, nombre_empresa = $5, contacto = $6, ciudad = $7, password = $8, idplan = $9 where idEmpresa = $10',[
ruc,
email,
telefono,
direccion,
nombre_empresa,
contacto,ciudad,
password,
idplan,
idEmpresa
])
}


const vertodo = async(req,res)=>{
const response = await pool.query('select idempresa,ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idplan,contrato,fecha_ingreso from copia')
res.status(200).json(response.rows);
}

const eliminartodo = async(req,res)=>{
const idempresa = req.params.idempresa;
const eliminar = await pool.query('delete from copia where idempresa = $1',[
  idempresa
])
res.json({
  message: 'Empresa eliminada sastifactoriamente'
})
}


module.exports = {
crearCuenta,
getSolicitudes,
crearSolicitud,
eliminarEmpresa,
ver,
veraceptados,
buscaraceptados,
desactivarcliente,
vercliente,
actualizarcliente,
vertodo,
eliminartodo
}