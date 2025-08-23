import { Router } from 'express';
import { getBooks, createBook } from './books.controller';

const router = Router();

router.get('/', getBooks);
router.post('/', createBook);

export default router;
