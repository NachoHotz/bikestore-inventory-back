import { z } from 'zod';

export const UpdateProductSchema = z.object({
  body: z.object({
    id: z.string({ invalid_type_error: 'El código debe ser un texto' }).optional(),
    name: z.string({ invalid_type_error: 'El nombre debe ser un texto' }).optional(),
    description: z.string({ invalid_type_error: 'La descripcion debe ser un texto' }).optional(),
    stock: z.number({ invalid_type_error: 'El stock debe ser un número' }).optional(),
  })
});
