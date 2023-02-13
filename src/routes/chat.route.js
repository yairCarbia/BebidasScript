import express from 'express';
import { getMessage } from '../controllers/chat.controller.js';
import { isLogged } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', isLogged, getMessage);

export default router;