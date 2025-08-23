import { Request, Response, NextFunction } from 'express';
import * as booksService from './books.service';
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  price: z.number().positive(),
});

export const getBooks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json({ data: books, ok: true });
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = bookSchema.parse(req.body);
    const book = await booksService.addBook(validated);
    res.status(201).json({ data: book, ok: true });
  } catch (err) {
    next(err);
  }
};
