import { z } from 'zod';

export const UpdateOrderSchema = z.object({
  body: z.object({
    amount: z
      .number({ invalid_type_error: 'El monto debe ser un número' })
      .optional(),
    products: z
      .string()
      .array()
      .optional(),
    paymentMethodId: z
      .number()
      .optional()
  })
});
