import { z } from 'zod';

export const UpdateProductSchema = z.object({
  body: z.object({
    id: z
      .string({ invalid_type_error: 'El código debe ser un texto' })
      .optional(),
    name: z
      .string({ invalid_type_error: 'El nombre debe ser un texto' })
      .min(1, 'El nombre no puede estar vacio')
      .optional(),
    description: z
      .string({ invalid_type_error: 'La descripcion debe ser un texto' })
      .min(1, 'La descripción no puede estar vacia')
      .optional(),
    stock: z
      .number({ invalid_type_error: 'El stock debe ser un número' })
      .min(0, 'El stock no puede ser menor a 0')
      .optional(),
    price: z
      .number({ invalid_type_error: 'El precio debe ser un número' })
      .min(0, 'El precio no puede estar vacio')
      .optional(),
    categoryId: z
      .number({ invalid_type_error: 'La categoria debe ser un número' })
      .optional(),
    providerId: z
      .number({ invalid_type_error: 'El proveedor debe ser un número' })
      .optional()
  })
});
