import express from 'express';
import { isLogged } from '../middlewares/auth.middleware.js';
import {
  homeController,
  signupController,
  welcomeController,
  formAddProductController,
  errorController
} from '../controllers/general.controller.js';
import { getMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/', homeController);
router.get('/signup', signupController);
router.get('/welcome', isLogged, welcomeController);
router.get('/chat', isLogged, getMessage);
router.get('/add-product', isLogged, formAddProductController);
router.get('/error/:msg', errorController);

export default router;