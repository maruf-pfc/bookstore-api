import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import { authorize } from '../../middlewares/rbac';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from './orders.controller';

const router = Router();

// Public routes (if any)
router.get('/', authenticate, authorize(['ADMIN', 'STAFF']), getOrders);
router.get('/:id', authenticate, authorize(['ADMIN', 'STAFF', 'CUSTOMER']), getOrderById);

// Protected routes
router.post('/', authenticate, authorize(['CUSTOMER']), createOrder);
router.put('/:id/status', authenticate, authorize(['ADMIN', 'STAFF']), updateOrderStatus);

export default router;
