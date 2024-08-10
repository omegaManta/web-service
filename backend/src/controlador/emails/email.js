const nodemailer = require('nodemailer');



const crearnotificaciontecnico = async(req,res)=>{
    const {email,celular,nombre_empresa,requiere,servicio,precio,
      contrato,foto_url
    } = req.body;


    
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
      subject: 'Servicio solicitado',
       html: 'Imagen del servicio:<br/> <img height="40px" src="cid:unique@kreata.ee"/><br/> '+
       ' Para cuestiones de cumplimiento normativo de la empresa tambien se adjunta el contrato del cliente ' 
       +'<br/> <a src="cid:pdf"></a> <br/>'
       +'Por favor contactarse con el numero '+celular+ ' de la empresa '
       +nombre_empresa+ 
       ' para el servicio '+servicio+ 
       ' el cual requirio. '
       +requiere+ ', con un precio de '+precio.toString()+ ' dolares.',
    attachments: [{
        filename: 'image.png',
        path: foto_url,
        cid: 'unique@kreata.ee' //same cid value as in the html img src
    },
    {
      filename: 'contrato.pdf',
      path: contrato,
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

        // Responder al cliente que todo fue exitoso
        res.status(200).json({ success: true });
      }
    });
    
  
    }



    const crearnotificacioncliente = async(req,res)=>{
    
      const {correo,tecnico_escogido,servicio,requiere,precio
      } = req.body;
  
  
      
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
        to: correo,
        subject: 'Solicitastes el servicio '+servicio,
        text: 'En breve el tecnico '+tecnico_escogido+ 
        ', el cual escogistes se comunicara contigo para tu requerimiento. ' +requiere+
        ', con un valor de '+precio.toString()+ ' dolares'
      };
  
     
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          res.status(500).json({ error: 'Error al enviar el correo' });
        } else {
          console.log('Correo enviado con éxito:', info.response);
  
          // Responder al cliente que todo fue exitoso
          res.status(200).json('Se comunico exitosamente con el cliente');
        }
      });
    }


const crearnotificacionpedido = async(req,res)=>{
  const {nombre_empresa,ruc,total} = req.body;
  const dominio = 'https://www.paypal.com/myaccount/summary';
  const dominio2 = 'https://factura.omegas-apps.com/panel/servicio-realizados';
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
    subject: 'Pago desde Paypal realizado por '+nombre_empresa+ ' con ruc '+
    ruc,
    text:'. Para conocer mas detalles acerca del pedido se adjunta el link para que ingreses al panel de servicios solicitados ' 
    +' '+dominio,
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pedido Realizado</title>
      <style>
        /* Estilos CSS aquí */
    
        /* Reset de estilos */
        body, h1, h2, h3, h4, h5, h6, p, a, img, div {
          margin: 0;
          padding: 0;
          border: 0;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }
    
        /* Contenedor principal */
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        /* Logo */
        .logo img {
          max-width: 200px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
    
        /* Mensaje */
        .message {
          text-align: center;
          margin-top: 20px;
        }
    
        .message p {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 15px;
        }
    
        .message strong {
          color: #007bff;
        }
    
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
    
        .btn:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">
          <p>Hola,</p>
          <p>Se ha realizado una compra mediante PayPal por parte del cliente <strong>${nombre_empresa}</strong> con RUC <strong>${ruc}</strong>, con un total de compra de <strong>${total}$</strong>.</p>
          <p>Para conocer el movimiento del pago, y el recibo generado con los detalles de la compra visite los siguientes enlaces:</p>
          <p><a href="${dominio}" class="btn">Ver mi pago PayPal</a></p>
          <p><a href="${dominio2}" class="btn">Ver recibos</a></p>
        </div>
      </div>
    </body>
    </html>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);

      // Responder al cliente que todo fue exitoso
      res.status(200).json({ success: true });
    }
  });
}


//Comprobante aceptado
const crearnotificacioncompletado = async (req, res) => {
  const { email, nombre_empresa, ruc, color, logo_email } = req.body;

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

  // Configuración del correo electrónico
  const mailOptions = {
    from: 'notificaciones@omegas-apps.com',
    to: email,
    subject: 'Recibo generado para el cliente ' + nombre_empresa + ' con RUC ' + ruc,
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recibo Generado</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333333;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: ${color};
          padding: 20px;
          text-align: center;
        }
        .header img {
          max-width: 150px;
          height: auto;
        }
        .content {
          padding: 30px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
          margin: 20px 0;
        }
        .content strong {
          color: #333333;
        }
        .footer {
          padding: 20px;
          text-align: center;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background-color: ${color};">
          <img src="${logo_email}" alt="Logo de la Empresa">
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Se ha generado un recibo para el cliente <strong>${nombre_empresa}</strong> con RUC <strong>${ruc}</strong>.</p>
          <p>Por favor, revise su perfil en la aplicación web para descargar su recibo y presentarlo en su tienda.</p>
        </div>
        <div class="footer">
          <p>Este es un correo electrónico generado automáticamente. Por favor, no responda a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).json({ success: true });
    }
  });
};



//Comprobante rechazado
const crearnotificacionrechazado = async (req, res) => {
  const { email, nombre_empresa, ruc, color, logo_email } = req.body;

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

  // Configuración del correo electrónico
  const mailOptions = {
    from: 'notificaciones@omegas-apps.com',
    to: email,
    subject: 'Recibo no generado para el cliente ' + nombre_empresa + ' con RUC ' + ruc,
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recibo Rechazado</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333333;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: ${color};
          padding: 20px;
          text-align: center;
        }
        .header img {
          max-width: 150px;
          height: auto;
        }
        .content {
          padding: 30px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
          margin: 20px 0;
        }
        .content strong {
          color: #333333;
        }
        .footer {
          padding: 20px;
          text-align: center;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background-color: ${color};">
          <img src="${logo_email}" alt="Logo de la Empresa">
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Se ha rechazado el recibo para el cliente <strong>${nombre_empresa}</strong> con RUC <strong>${ruc}</strong>.</p>
          <p>Por favor, suba nuevamente su comprobante de pago en la aplicación web.</p>
        </div>
        <div class="footer">
          <p>Este es un correo electrónico generado automáticamente. Por favor, no responda a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).json({ success: true });
    }
  });
};



//Aviso de comprobante
const crearnotificacionaviso = async (req, res) => {
  const { nombre_empresa, ruc, total,corporativo,logo_email, color } = req.body;

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

  // Configuración del correo electrónico
  const mailOptions = {
    from: 'notificaciones@omegas-apps.com',
    to: corporativo,
    subject: 'Aviso de pago mediante comprobante del cliente ' + nombre_empresa + ' con RUC ' + ruc,
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aviso de Pago</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333333;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: ${color};
          padding: 20px;
          text-align: center;
        }
        .header img {
          max-width: 150px;
          height: auto;
        }
        .content {
          padding: 30px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
          margin: 20px 0;
        }
        .content strong {
          color: #333333;
        }
        .footer {
          padding: 20px;
          text-align: center;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header" style="background-color: ${color};">
          <img src="${logo_email}" alt="Logo de la Empresa">
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Se ha subido un comprobante de pago del cliente <strong>${nombre_empresa}</strong> con RUC <strong>${ruc}</strong>.</p>
          <p>El total depositado es de <strong>${total}</strong>. Por favor, revise la aplicación web del panel para verificar su validez.</p>
        </div>
        <div class="footer">
          <p>Este es un correo electrónico generado automáticamente. Por favor, no responda a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).json({ success: true });
    }
  });
};








const crearnotificacionobservacion = async(req,res)=>{

  const {nombre_empresa,ruc,requiere,comentario,
    tecnico_escogido
  } = req.body;
  const dominio = 'https://factura.omegas-apps.com/panel/welcome/servicio-realizados'


  
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
    subject: 'La empresa '+nombre_empresa+ ' con ruc '+
    ruc+ ' emitio un comentario sobre el trabajo completado del tecnico',
     html:
     ' Requerimiento: '+
     requiere+ '. El tecnico que escogio: '+tecnico_escogido+ '. '+ '  '+comentario+
     '. Por favor ingresa al siguiente link para conocer mas detalles: ' 
     +'<a href="' + dominio + '">Ir</a>',
  };

 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);

      // Responder al cliente que todo fue exitoso
      res.status(200).json({ success: true });
    }
  });




}




const crearnotificacionvisita = async(req,res)=>{

  const {correo,nombre_empresa,ruc,mensaje,
    tecnico_escogido
  } = req.body;
  


  
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
    to: correo,
    subject: 'Saludos '+nombre_empresa+ ' con ruc '+
    ruc,
     html:
     ' Requerimiento: '+
     mensaje+ '. La fecha y hora de la visita de su tecnico '+tecnico_escogido+
     '. Ya se encuentra en la pagina por favor revisala',

  };

 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);

      // Responder al cliente que todo fue exitoso
      res.status(200).json({ success: true });
    }
  });
}



const crearnotificaciontienda = async(req,res)=>{

  const {nombre_empresa,nombre_propietario,email} = req.body;


  
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
    to:  email,
    subject: 'Aviso de pago mediante comprobante del cliente '+nombre_empresa+ ' con ruc '+ruc,
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pedido Realizado</title>
      <style>
        /* Estilos CSS aquí */
    
        /* Reset de estilos */
        body, h1, h2, h3, h4, h5, h6, p, a, img, div {
          margin: 0;
          padding: 0;
          border: 0;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }
    
        /* Contenedor principal */
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        /* Logo */
        .logo img {
          max-width: 200px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
    
        /* Mensaje */
        .message {
          text-align: center;
          margin-top: 20px;
        }
    
        .message p {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 15px;
        }
    
        .message strong {
          color: #007bff;
        }
    
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
    
        .btn:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">
          <p>Hola,</p>
          <p>Se lo añadio a la tienda <strong>${nombres_empresa} del propietario ${nombre_propietario}</strong></strong></strong>.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);

      // Responder al cliente que todo fue exitoso
      res.status(200).json({ success: true });
    }
  });

}





    module.exports = {
        crearnotificaciontecnico,
        crearnotificacioncliente,
        crearnotificacionpedido,
        crearnotificacioncompletado,
        crearnotificacionobservacion,
        crearnotificacionvisita,
        crearnotificacionrechazado,
        crearnotificacionaviso
    }