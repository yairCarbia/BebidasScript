import { serverConfig } from '../configs/server.config.js';
import { Storage } from "../daos/index.js";
import { logger } from '../utils/winston.util.js';
import { sendMail } from '../utils/nodemailer.util.js';

const storage = Storage().order;

const createOrdenController = async (req, res) => {
  try {
    const userLog = req.user;
    const userId = req.body.idUser;
    const order = await storage.createOrder(userId);

    orderSendMail(userLog, order);

    return res.render('order-final', { userLog });
  }
  catch (err) {
    const msgError = `Error al crear el la orden ${err}`;
    logger.info.error(msgError);
    return res.status(404).json({ error: msgError });
  }
};

const viewOrderController = (req, res) => {
  return res.send('viewOrder');
}

const orderSendMail = async (userLog, order) => {
  let orderDetail = '';

  order.products.forEach(element => {
    orderDetail += `
      <li>Producto: ${element.name}. Codigo: ${element.code} </li>
    `;
  });

  const mailOptions = {
    from: serverConfig.MAILER_USER,
    to: serverConfig.MAILER_USER_TO,
    subject: `Nuevo pedido de: ${userLog.username}`,
    html: `
      <h3>Nuevo pedido!</h3>
      <p> Datos del cliente:</p>
      <ul>
      <li> Nombre: ${userLog.username}</li>
      <li> Email: ${userLog.email}</li>
      <li> Teléfono: ${userLog.phone}</li>
      <li> Direccion: ${userLog.address}</li>
      </ul>
      <p> Pedido:</p>
      <ul>
      ${orderDetail}
      </ul>
    `
  };
  const email = await sendMail(mailOptions);
  logger.info.error('orderSendMail:::' + email);
}



export {
  createOrdenController,
  viewOrderController
}