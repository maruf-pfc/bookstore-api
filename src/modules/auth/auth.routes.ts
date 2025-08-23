import { Router } from 'express';
import * as authController from './auth.controller';
import { refreshToken } from './auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', refreshToken);

export default router;
