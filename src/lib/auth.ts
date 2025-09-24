import { getDb } from './mongodb';
import bcrypt from 'bcryptjs';

export async function signIn(email: string, password: string) {
  const db = await getDb();
  const user = await db.collection('users').findOne({ email });

  if (!user) {
    return { success: false };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false };
  }

  return { success: true, user: { id: user._id, email: user.email, role: user.role } };
}