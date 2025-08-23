import { pool } from '../../config/db';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const { rows } = await pool.query('SELECT * FROM books ORDER BY id');
  return rows;
};

export const addBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const { title, author, price } = book;
  const { rows } = await pool.query(
    'INSERT INTO books (title, author, price) VALUES ($1, $2, $3) RETURNING *',
    [title, author, price]
  );
  return rows[0];
};
