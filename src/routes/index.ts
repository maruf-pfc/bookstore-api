import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import booksRoutes from '../modules/books/books.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', booksRoutes);

export default router;
