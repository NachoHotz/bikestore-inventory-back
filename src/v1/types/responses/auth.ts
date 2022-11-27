import { User } from '@prisma/client';

export type SignUpResponse = {
  status: number;
  user: User;
}

export type LoginResponse = {
  status: number;
  user: User;
}
