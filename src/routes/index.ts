import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import bookRoutes from '../modules/books/books.routes';
import orderRoutes from '../modules/orders/orders.routes';
import userRoutes from '../modules/users/users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

export default router;
