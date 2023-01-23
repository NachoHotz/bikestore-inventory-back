import { z } from 'zod';

export const CreateSaleSchema = z.object({
  body: z.object({
    amount: z
      .number({
        required_error: 'El monto de la venta es requerido',
        invalid_type_error: 'El monto debe ser un número'
      }),
    products: z
      .string({ required_error: 'Los productos son requeridos' })
      .array(),
    paymentMethodId: z
      .number({ required_error: 'El metodo de pago es requerido' })
  })
});
