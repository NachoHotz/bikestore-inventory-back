import { Sale } from '@prisma/client';

export type GetAllSalesResponse = {
  status: number;
  allSales: Sale[];
}

export type GetUniqueSaleResponse = {
  status: number;
  uniqueSale: Sale;
}

export type CreateSaleResponse = {
  status: number;
  createdSale: Sale;
}

export type UpdateSaleResponse = {
  status: number;
  message?: string;
  updatedSale: Sale;
}

export type DeleteSaleResponse = {
  status: number;
  message?: string;
  deletedSale: Sale;
}
