import { Router } from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from './books.controller';
import { authenticate } from '../../middlewares/auth';
import { authorize } from '../../middlewares/rbac';

const router = Router();

// Public endpoints
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected endpoints - ADMIN and STAFF can create/update; ADMIN only for delete
router.post('/', authenticate, authorize(['ADMIN', 'STAFF']), createBook);
router.put('/:id', authenticate, authorize(['ADMIN', 'STAFF']), updateBook);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteBook);

export default router;
