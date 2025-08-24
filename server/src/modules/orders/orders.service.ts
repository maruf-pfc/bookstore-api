import { pool } from '../../config/db';

export type OrderItem = {
  book_id: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  user_id: number;
  total: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  items?: OrderItem[];
  created_at?: Date;
};

// Create a new order with items
export const createOrder = async (user_id: number, items: OrderItem[]): Promise<Order> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id, user_id, total, status, created_at`,
      [user_id, total]
    );
    const order = orderRows[0];

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ($1, $2, $3, $4)`,
        [order.id, item.book_id, item.quantity, item.price]
      );

      await client.query(
        `UPDATE books SET stock = stock - $1 WHERE id = $2`,
        [item.quantity, item.book_id]
      );
    }

    await client.query('COMMIT');

    return { ...order, items };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  const { rows } = await pool.query(`SELECT * FROM orders ORDER BY id ASC`);
  return rows;
};

// Get order by ID with items
export const getOrderById = async (id: number): Promise<Order | null> => {
  const { rows } = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);
  const order = rows[0];
  if (!order) return null;

  const { rows: items } = await pool.query(`SELECT * FROM order_items WHERE order_id=$1`, [id]);
  return { ...order, items };
};

// Update order status
export const updateOrderStatus = async (id: number, status: 'PENDING' | 'PAID' | 'CANCELLED'): Promise<Order | null> => {
  const { rows } = await pool.query(
    `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  return rows[0] ?? null;
};
