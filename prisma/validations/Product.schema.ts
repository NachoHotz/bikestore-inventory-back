import { z } from 'zod';

export const ProductSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'El código es requerido' }),
    name: z.string({ required_error: 'El nombre es requerido' }),
    description: z.string({ invalid_type_error: 'La descripción debe ser un texto' }).optional(),
    quantity: z.number({ invalid_type_error: 'La cantidad debe ser un número', required_error: 'La cantidad es requerida' })
  })
});
