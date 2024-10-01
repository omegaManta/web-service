const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const {pool} = require('../../db/conexion');
const jwt = require('jsonwebtoken');


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


const crearSolicitud = async (req, res) => {
  const {
    ruc,
    email,
    telefono,
    direccion,
    nombre_empresa,
    contacto,
    ciudad,
    password,
    idusuario,
    empresa,
    nombre_propietario,
    logo_email,
    color,
    color_fuente
  } = req.body;
  const dominio = 'https://tienda-gamma-orpin.vercel.app/';
  // Configuración del transporte para NodeMailer (Hotmail/Outlook)
  const transporter = nodemailer.createTransport({
    host: "mail.omegas-apps.com",
    pool: true,
    secure: false,
    port: 587,
    auth: {
      user: "notificaciones@omegas-apps.com",
      pass: "N0t1f1c@c10nes*2024",
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
    maxConnections: 100,
    maxMessages: 100,
    authMethod: 'LOGIN',
    requireTLS: true,
    rateLimit: 1,
  });

  // Plantilla HTML para el correo electrónico
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;;">
      <div style="max-width: 600px; margin: auto; background-color: ${color}"; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: ${color}; color: ${color_fuente}; padding: 20px; text-align: center;">
          <img src="${logo_email}" alt="Logo" style="max-width: 100px; border-radius: 50%;"/>
        </div>
        <div style="padding: 20px;background-color: ${color};">
          <h2 style="color: ${color_fuente}">Bienvenido a la tienda ${empresa}</h2>
          <p style="color: ${color_fuente}">Estimado/a ${nombre_empresa},</p>
          <p style="color: ${color_fuente}">Gracias por preferirnos. Usted ha sido añadido a la tienda <strong>${empresa}</strong> de <strong>${nombre_propietario}</strong>.</p>
          <p style="color: ${color_fuente}">Inicie sesión con las siguientes credenciales:</p>
          <p style="color: ${color_fuente}"><strong>Correo:</strong> ${email}</p>
          <p style="color: ${color_fuente}"><strong>Contraseña:</strong> ${password}</p>
          <p style="color: ${color_fuente}">Por favor, no comparta su información con nadie.</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="${dominio}" style="background-color: ${color}; color: ${color_fuente}; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Iniciar Sesión</a>
          </p>
        </div>
        <div style="background-color: #f4f4f4; color: #666; padding: 10px; text-align: center;">
          <p>© 2024 ${empresa}. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  `;

  // Configuración del correo electrónico
  const mailOptions = {
    from: 'notificaciones@omegas-apps.com',
    to: email,
    subject: `Cliente ${nombre_empresa}, por favor cambie su contraseña y no comparta sus datos con nadie`,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);

      try {
        // Guardar la empresa en la base de datos
        await pool.query(
          'INSERT INTO copia(ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario]
        );

        // Responder al cliente que todo fue exitoso
        res.status(200).json({ success: true });
        notificartienda(email);
      } catch (dbError) {
        console.error('Error al guardar en la base de datos:', dbError);
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
      }
    }
  });
};






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
            const datosEmpresa = await pool.query('SELECT * FROM usuario p join empresa e on p.idusuario = e.idusuario');
            res.status(200).json(datosEmpresa.rows)
            }
       

            
const veraceptados = async(req,res)=>{
  const response = await pool.query('select d.idEmpresa, d.ruc, d.email, d.telefono, d.direccion, d.nombre_empresa, d.contacto, d.ciudad, d.password, d.idusuario,d.fecha_ingreso, p.empresa from usuario p join copia d on p.idusuario = d.idusuario')
  res.status(200).json(response.rows)
}


const verclientesusuario = async (req, res) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'panel omega web');
    const userId = decoded.userId;

    const result = await pool.query('select d.idEmpresa, d.ruc, d.email, d.telefono, d.direccion, d.nombre_empresa, d.contacto, d.ciudad, d.password, d.idusuario,d.fecha_ingreso, p.empresa from usuario p join copia d on p.idusuario = d.idusuario where p.idusuario = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil de usuario no encontrado' });
    }

    const userProfile = result.rows;
    return res.json({ profile: userProfile });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};



const buscaraceptados = async(req,res)=>{
  const nombre_empresa = req.params.nombre_empresa
  const response = await pool.query('select d.idEmpresa, d.ruc, d.email, d.telefono, d.direccion, d.nombre_empresa, d.contacto, d.ciudad, d.password, d.idplan,d.fecha_ingreso, p.nombres_empresa from usuario p join copia d on p.idusuario = d.idusuario where nombre_empresa like $1',[
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
  const response = await pool.query('select idEmpresa,ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario from copia where idEmpresa = $1',[
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
idusuario} = req.body
const actualizar = await pool.query('update copia set ruc = $1, email = $2, telefono = $3, direccion = $4, nombre_empresa = $5, contacto = $6, ciudad = $7, password = $8, idusuario = $9 where idEmpresa = $10',[
ruc,
email,
telefono,
direccion,
nombre_empresa,
contacto,ciudad,
password,
idusuario,
idEmpresa
])
}


const vertodo = async(req,res)=>{
const response = await pool.query('select idempresa,ruc, email, telefono, direccion, nombre_empresa, contacto, ciudad, password, idusuario,contrato,fecha_ingreso from copia')
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
verclientesusuario,
buscaraceptados,
desactivarcliente,
vercliente,
actualizarcliente,
vertodo,
eliminartodo
}