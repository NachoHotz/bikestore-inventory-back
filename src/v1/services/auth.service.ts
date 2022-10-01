import { NextFunction } from 'express';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../../config';
import { BadRequestException, InternalServerException, InvalidCredentialsException } from '../exceptions';
import { createToken } from '../../lib/jwt';

export async function Login(loginCredentials: User, next: NextFunction) {
  try {
    const userExists = await prisma.user.findUnique({ where: { email: loginCredentials.email } });

    if (!userExists) {
      return next(new InvalidCredentialsException('Correo o contraseña incorrectos'));
    }

    const passwordsMatch = await bcrypt.compare(userExists.password, loginCredentials.password);

    if (!passwordsMatch) {
      return next(new InvalidCredentialsException('Correo o contraseña incorrectos'));
    }

    const access_token = createToken(userExists, 'access');
    const refresh_token = createToken(userExists, 'refresh');

    return { access_token, refresh_token, current_user: userExists };
  } catch (error: any) {
    return next(new InternalServerException(`Error Login Service: ${error.message}`));
  }
}

export async function SignUp(signUpInfo: User, next: NextFunction) {
  try {
    const userExists = await prisma.user.findUnique({ where: { email: signUpInfo.email } });

    if (userExists) {
      return next(new BadRequestException(`Ya existe un usario registrado con el correo ${signUpInfo.email}`));
    }

    const passwordHashed = await bcrypt.hash(signUpInfo.password, 12);

    const createdUser = await prisma.user.create({ data: { ...signUpInfo, password: passwordHashed } });

    const access_token = createToken(createdUser, 'access');
    const refresh_token = createToken(createdUser, 'refresh');

    return { access_token, refresh_token, current_user: createdUser };
  } catch (error: any) {
    return next(new InternalServerException(`Error SignUp service: ${error.message}`));
  }
}
