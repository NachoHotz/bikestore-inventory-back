import { z } from 'zod';

export const CreateProductSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'El código es requerido' }),
    name: z.string({ required_error: 'El nombre es requerido' }),
    description: z.string({ invalid_type_error: 'La descripción debe ser un texto' }).optional(),
    stock: z.number({ invalid_type_error: 'El stock debe ser un número', required_error: 'El stock es requerido' }).min(1, 'El stock minimo es 1'),
    price: z.number({ invalid_type_error: 'El precio debe ser un número', required_error: 'El precio es requerido' }),
    categoryId: z.number({ required_error: 'La categoria es requerida', invalid_type_error: 'La categoria debe ser un número' }),
    providerId: z.number({ required_error: 'El proveedor es requerido', invalid_type_error: 'El proveedor debe ser un número' })
  })
});
