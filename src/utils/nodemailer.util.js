import nodemailer from 'nodemailer'
import { serverConfig } from '../configs/server.config.js';
import { logger } from './winston.util.js';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: serverConfig.MAILER_USER,
    pass: serverConfig.MAILER_PASS,
  },
});

const sendMail = async (options) => {
  try {
    const response = await transporter.sendMail(options);
    logger.info.info('sendMail::: ' + response);
  }
  catch (error) {
    logger.info.error('sendMail::: ' + error);
  }
}

export { sendMail }
