import { z } from 'zod';

export const UpdateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'El nombre debe ser un texto' })
      .min(1, 'El nombre no puede estar vacio')
      .optional()
  })
});
