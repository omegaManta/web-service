const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express()
require('dotenv').config()
const PORT = process.env.PORT || 1000 
server.use(bodyParser.json({limit: "50mb"}));
server.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
server.use(cors());



//usuarios
server.use(require('../src/rutas/usuario'))
//servicios
server.use(require('../src/rutas/servicio'))
//productos
server.use(require('../src/rutas/empresa'))
//informaciones
server.use(require('../src/rutas/informacion'))
//empresas
server.use(require('../src/rutas/registro/empresa'))
//inicio de sesion
server.use(require('../src/rutas/login/empresa'))
//planes
server.use(require('../src/rutas/plan/plan'))
//tecnicos
server.use(require('../src/rutas/tecnico/tecnico'))
//desactivados
server.use(require('../src/rutas/registro/desactivado'))
//identificacion de empresas
server.use(require('../src/rutas/identificacion/identificacion'))
//contratos
server.use(require('../src/rutas/contrato/contrato'))
//anuncios
server.use(require('../src/rutas/publicidad/publicidad'))
//pedidos
server.use(require('../src/rutas/pedido/pedido'))
//tutoriales
server.use(require('../src/rutas/tutorial/tutorial'))
//video ayuda
server.use(require('../src/rutas/mesa-ayuda/ayuda'))
//observaciones
server.use(require('../src/rutas/observacion/observacion'))
//notificaciones
server.use(require('../src/rutas/emails/email'));
//roles-usuarios
server.use(require('../src/rutas/panel/panel'));
//menu usuarios
server.use(require('../src/rutas/panel/menu'));
//recibos del cliente
server.use(require('../src/rutas/recibo/recibo'));
//lista de deseos de los clientes
server.use(require('../src/rutas/registro/favorito'));
//pagos
server.use(require('../src/rutas/pagos/pagos'));



server.listen(PORT)
console.log('Servidor corriendo por el puerto ',PORT)