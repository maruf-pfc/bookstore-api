import { Request, Response } from 'express';
import * as authService from './auth.service';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
  retypePassword: z.string().min(8, 'Retype Password too short')
});


const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, retypePassword } = registerSchema.parse(req.body);
    const user = await authService.register(name, email, password, retypePassword);
    res.status(201).json({ ok: true, user });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const data = await authService.login(email, password);
    res.json({ ok: true, ...data });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err.message });
  }
};
