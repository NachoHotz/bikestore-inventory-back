import { z } from 'zod';

export const CreateProviderSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un texto' }),
    email: z.string({ required_error: 'EL email es requerido' }).email({ message: 'El email debe ser uno valido' })
  })
});
