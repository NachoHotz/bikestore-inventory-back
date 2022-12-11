import { PaymentMethod } from '@prisma/client';

export type GetAllPaymentMethodsResponse = {
  status: number;
  paymentMethods: PaymentMethod[];
}

export type CreatePaymentMethodResponse = {
  status: number;
  createdPaymentMethod: PaymentMethod;
}

export type UpdatePaymentMethodResponse = {
  status: number;
  message?: string;
  updatedPaymentMethod: PaymentMethod;
}

export type DeletePaymentMethodResponse = {
  status: number;
  message?: string;
  deletedPaymentMethod: PaymentMethod;
}
