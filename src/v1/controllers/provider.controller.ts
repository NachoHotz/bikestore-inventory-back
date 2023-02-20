import { Provider } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as providerService from '../services/provider.service';
import { BaseResponse } from '../types/responses/baseResponse';

export async function getAll(_req: Request, res: Response<BaseResponse<Provider[]>>, next: NextFunction) {
  try {
    const allProviders = await providerService.GetAll(next);

    if (!allProviders || allProviders.length === 0) {
      return next(new NotFoundException('No se han encontrado proveedores'));
    }

    return res.status(200).send({ status: 200, data: allProviders });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllProviders controller: ${error.message}`));
  }
}

export async function getOne(req: Request, res: Response<BaseResponse<Provider>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const uniqueProvider = await providerService.GetOne(id, next);

    if (!uniqueProvider) {
      return next(new NotFoundException('No se encontro el proveedor solicitado'));
    }

    return res.status(200).send({ status: 200, data: uniqueProvider });
  } catch (error: any) {
    return next(new InternalServerException(`Error getOneProvider controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response<BaseResponse<Provider>>, next: NextFunction) {
  try {
    const createdProvider = await providerService.Create(req.body, next);

    if (!createdProvider) return;

    return res.status(201).send({ status: 201, message: 'Proveedor creado con exito', data: createdProvider });
  } catch (error: any) {
    return next(new InternalServerException(`Error createProvider controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response<BaseResponse<Provider>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const updatedProvider = await providerService.Update(id, req.body, next);

    if (!updatedProvider) return;

    return res.status(200).send({ status: 200, message: 'Proveedor actualizado con éxito', data: updatedProvider });
  } catch (error: any) {
    return next(new InternalServerException(`Error updateProvider controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response<BaseResponse<Provider>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const deletedProvider = await providerService.Delete(id, next);

    if (!deletedProvider) return;

    return res.status(200).send({ status: 200, message: 'Proveedor eliminado con éxito', data: deletedProvider });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteProvider controller: ${error.message}`));
  }
}
