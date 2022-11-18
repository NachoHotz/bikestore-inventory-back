import { Provider } from '@prisma/client';

export type GetAllProvidersResponse = {
  status: number;
  allProviders?: Provider[];
}

export type GetOneProviderResponse = {
  status: number;
  uniqueProvider: Provider;
}

export type CreateProviderResponse = {
  status: number;
  createdProvider: Provider;
}

export type UpdateProviderResponse = {
  status: number;
  message?: string;
  updatedProvider: Provider;
}

export type DeleteProviderResponse = {
  status: number;
  message?: string;
  deletedProvider: Provider;
}
