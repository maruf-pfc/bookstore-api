import { pool } from '../../config/db';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at?: Date;
};

export type NewBook = {
  title: string;
  author: string;
  price: number;
  stock?: number;
  is_active?: boolean;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const { rows } = await pool.query(
    `SELECT id, title, author, price, stock, is_active, created_at 
     FROM books WHERE is_active = true ORDER BY id ASC`
  );
  return rows;
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const { rows } = await pool.query(
    `SELECT id, title, author, price, stock, is_active, created_at 
     FROM books WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
};

export const createBook = async (payload: NewBook): Promise<Book> => {
  const { title, author, price, stock = 0, is_active = true } = payload;
  const { rows } = await pool.query(
    `INSERT INTO books (title, author, price, stock, is_active)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, title, author, price, stock, is_active, created_at`,
    [title, author, price, stock, is_active]
  );
  return rows[0];
};

export const updateBook = async (
  id: number,
  payload: Partial<NewBook>
): Promise<Book | null> => {
  const keys = Object.keys(payload) as (keyof NewBook)[];
  if (keys.length === 0) return getBookById(id);

  const sets: string[] = [];
  const values: any[] = [];

  keys.forEach((k, idx) => {
    sets.push(`${k} = $${idx + 1}`);
    // @ts-ignore
    values.push(payload[k]);
  });

  values.push(id); // last param = id
  const query = `UPDATE books SET ${sets.join(', ')} WHERE id = $${values.length} RETURNING id, title, author, price, stock, is_active, created_at`;

  const { rows } = await pool.query(query, values);
  return rows[0] ?? null;
};

export const deleteBook = async (id: number): Promise<Book | null> => {
  // Soft delete: mark as inactive
  const { rows } = await pool.query(
    `UPDATE books SET is_active = false WHERE id = $1 RETURNING id, title, author, price, stock, is_active, created_at`,
    [id]
  );
  return rows[0] ?? null;
};
