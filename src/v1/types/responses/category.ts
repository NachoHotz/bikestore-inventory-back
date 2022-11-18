import { Category } from '@prisma/client';

export type GetAllCategoriesResponse = {
  status: number;
  allCategories: Category[];
}

export type GetOneCategoryResponse = {
  status: number;
  uniqueCategory: Category;
}

export type CreateCategoryResponse = {
  status: number;
  createdCategory: Category;
}

export type UpdateCategoryResponse = {
  status: number;
  message?: string;
  updatedCategory: Category;
}

export type DeleteCategoryResponse = {
  status: number;
  message?: string;
  deletedCategory: Category;
}
