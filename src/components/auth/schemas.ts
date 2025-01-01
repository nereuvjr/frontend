import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Por favor, insira um email válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});