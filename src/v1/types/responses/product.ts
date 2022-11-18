import { Product } from '@prisma/client';

export type GetAllProductsResponse = {
  status: number;
  allProducts?: Product[];
  productsQuery?: Product[];
}

export type GetOneProductResponse = {
  status: number;
  uniqueProduct: Product;
}

export type CreateProductResponse = {
  status: number;
  createdProduct: Product;
}

export type UpdateProductResponse = {
  status: number;
  message?: string;
  updatedProduct: Product;
}

export type DeleteProductResponse = {
  status: number;
  message?: string;
  deletedProduct: Product;
}
