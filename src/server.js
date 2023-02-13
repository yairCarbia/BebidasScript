import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server } from "socket.io";
import { Storage } from "./daos/index.js";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { serverConfig } from './configs/server.config.js';
import { sessionConfig } from './configs/session.config.js';
import { __dirname, __dirJoin } from './utils/helper.util.js';
import { isLogged } from './middlewares/auth.middleware.js';
import { logger } from './utils/winston.util.js';
import {
  cartRoute,
  generalRoute,
  loginRoute,
  logoutRoute,
  singupRoute,
  profileRoute,
  orderRoute,
  productRoute,

} from './routes/index.js';


// Server 
const app = express();
const PORT = serverConfig.PORT;



//ejs
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statics
app.use(express.static(__dirJoin(__dirname, '../public')));
app.use(express.static(__dirJoin(__dirname, '../files')));
app.use(express.static(__dirJoin(__dirname, '../public')));
app.use('/uploads', express.static(__dirJoin(__dirname, '../public/uploads')));
app.use('/favicon.ico', express.static(__dirJoin(__dirname, '../public/favicon.ico')));

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

//ejs
app.set('view engine', 'ejs');
app.set('views', __dirJoin(__dirname, '../views'));

//Io
const server = http.createServer(app);
const io = new Server(server);

//Conexion 
const srv = app.listen(PORT, () => {
  logger.info.info(`Servidor http en puerto: ${srv.address().port}`);
});
srv.on("error", error => logger.info.error(`Error en servidor ${error}`));

//Storage 

const messageStorage = Storage().chat;
let users = [];

// socket messages
io.on('connection', socket => {
  socket.on('joinMessage', async ({ userName }) => {
    users.push({
      id: socket.id,
      userName: userName,
      avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
    });

    socket.emit('notification', `Bienvenido ${userName}`);
    try {
      const allMessageStorage = await messageStorage.getAll();

      jsonNormalizer(jsonTestData);

      socket.emit('allMessage', allMessageStorage);
    }
    catch (err) {
      console.log(`Error ${err}`);
    }

    socket.broadcast.emit('notification', `${userName} se ha unido al chat`);
    io.sockets.emit('users', users);
  });

  socket.on('messageInput', async data => {
    const user = users.find(user => user.id === socket.id);
    const newMessage = {
      id: user.userName,
      author: {
        id: user.userName,
        nombre: 'User Name',
        apellido: 'User Last Name',
        alias: 'User Alias',
        edad: 'Age',
        avatar: 'User Url Avatar'
      },
      text: {
        id: getMongoObjectId,
        mensaje: data,
      }
    }
    await messageStorage.save(newMessage);

    socket.emit('message', newMessage);
    socket.broadcast.emit('message', newMessage);
  });

  socket.on('disconnect', reason => {
    const user = users.find(user => user.id === socket.id);
    users = users.filter(user => user.id !== socket.id);
    if (user) {
      socket.broadcast.emit('notification', `${user.userName} se ha ido del chat`);
    }

    io.sockets.emit('users', users);
  });
});


// Router.
app.use((req, res, next) => {
  logger.info.info(`
  Path url: ${req.originalUrl}
  Method: ${req.method}`);
  next();
});
app.use('/', generalRoute);
app.use('/api/product', isLogged, productRoute);
app.use('/api/cart', isLogged, cartRoute);
app.use('/api/order', isLogged, orderRoute);
app.use('/profile', isLogged, profileRoute);
app.use('/auth/logout', isLogged, logoutRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/signup', singupRoute);

app.use((req, res) => {
  logger.info.error(`
  State: 404
  Path url: ${req.originalUrl}
  Method: ${req.method}`);

  const msgError = `State: 404, Path url: ${req.originalUrl}, Method ${req.method}`;
  res.render('error-view', { msgError });
});


