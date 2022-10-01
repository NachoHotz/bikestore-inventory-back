import { z } from 'zod';

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'El email es requerido' }).email({ message: 'El email debe ser uno valido' }),
    password: z.string({ required_error: 'La contraseña es requerida' }).min(6, 'La contraseña deber ser de minino 6 caracteres')
  })
});
