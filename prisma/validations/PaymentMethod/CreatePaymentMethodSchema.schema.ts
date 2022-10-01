import { z } from 'zod';

export const CreatePaymentMethodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un texto' })
  })
});
