import { Request, Response, NextFunction } from 'express';
import * as ordersService from './orders.service';
import { z } from 'zod';

const createOrderSchema = z.object({
  items: z.array(z.object({
    book_id: z.number().int().positive(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  }))
});

export const getOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.getOrders();
    res.json({ ok: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'Invalid order id' });

    const order = await ordersService.getOrderById(id);
    if (!order) return res.status(404).json({ ok: false, error: 'Order not found' });

    res.json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createOrderSchema.parse(req.body);
    // user id from auth middleware
    const user_id = (req as any).user.id;
    const order = await ordersService.createOrder(user_id, parsed.items);
    res.status(201).json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'Invalid order id' });

    const updated = await ordersService.updateOrderStatus(id, status);
    if (!updated) return res.status(404).json({ ok: false, error: 'Order not found' });

    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
};
