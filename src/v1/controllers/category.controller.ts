import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as categoryService from '../services/category.service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const allCategories = await categoryService.GetAll(next);

    if (!allCategories || allCategories.length === 0) {
      return next(new NotFoundException('No se han encontrado categorias'));
    }

    return res.status(200).send({ status: 200, allCategories });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllCategories controller: ${error.message}`));
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction){
  try {
    const id = parseInt(req.params.id, 10);

    const uniqueCategory = await categoryService.GetOne(id, next);

    if (!uniqueCategory) {
      return next(new NotFoundException('No se encontro la categoria solicitada'));
    }

    return res.status(200).send({ status: 200, uniqueCategory });
  } catch (error: any) {
    return next(new InternalServerException(`Error getOneCategory controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdCategory = await categoryService.Create(req.body, next);

    if (!createdCategory) return;

    return res.status(201).send({ status: 201, createdCategory });
  } catch (error: any) {
    return next(new InternalServerException(`Error createCategory controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);

    const updatedCategory = await categoryService.Update(id, req.body, next);

    if (!updatedCategory) return;

    return res.status(200).send({ status: 200, updatedCategory });
  } catch (error: any) {
    return next(new InternalServerException(`Error updateCategory controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);

    const deletedCategory  = await categoryService.Delete(id, next);

    if (!deletedCategory) return;

    return res.status(200).send({ status:200, message: 'Categoria eliminada con éxito' });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteCategory controller: ${error.message}`));
  }
}