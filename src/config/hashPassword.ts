import { hash } from 'bcryptjs';

export default async function hashPassowrd(password: string): Promise<string> {
  const hashedPassword = await hash(password, 8);
  return hashedPassword;
}
