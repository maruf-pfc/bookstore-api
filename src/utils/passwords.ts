import bcrypt from 'bcryptjs';

export const hashPassword = async (plain: string) => bcrypt.hash(plain, 12);
export const verifyPassword = async (plain: string, hash: string) => bcrypt.compare(plain, hash);
