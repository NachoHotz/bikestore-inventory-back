import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as providerService from '../services/provider.service';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const allProviders = await providerService.GetAll(next);

    if (!allProviders || allProviders.length === 0) {
      return next(new NotFoundException('No se han encontrado proveedores'));
    }

    return res.status(200).send({ status: 200, allProviders });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllProviders controller: ${error.message}`));
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);

    const uniqueProvider = await providerService.GetOne(id, next);

    if (!uniqueProvider) {
      return next(new NotFoundException('No se encontro el proveedor solicitado'));
    }

    return res.status(200).send({ status: 200, uniqueProvider });
  } catch (error: any) {
    /* handle error */
    return next(new InternalServerException(`Error getOneProvider controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdProvider = await providerService.Create(req.body, next);

    if (!createdProvider) return;

    return res.status(201).send({ status: 201, createdProvider });
  } catch (error: any) {
    return next(new InternalServerException(`Error createProvider controller: ${error.message}`));
  }
}
