import { z } from 'zod';

export const SignUpUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un text'
      })
      .min(1, 'El nombre no puede estar vacio'),
    email: z
      .string({ required_error: 'El correo es requerido' })
      .email({ message: 'El correo debe ser uno valido' })
      .min(1, 'El email no puede estar vacio'),
    password: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
  })
});
