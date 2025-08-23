import { Router } from 'express';
import * as usersController from './users.controller';
import { authenticate } from '../../middlewares/auth';
import { authorize } from '../../middlewares/rbac';

const router = Router();

// 👮‍♂️ Only ADMIN can manage users
router.get('/', authenticate, authorize(['ADMIN']), usersController.getAllUsers);
router.get('/:id', authenticate, authorize(['ADMIN']), usersController.getUserById);
router.put('/:id', authenticate, authorize(['ADMIN']), usersController.updateUser);
router.delete('/:id', authenticate, authorize(['ADMIN']), usersController.deleteUser);

export default router;
