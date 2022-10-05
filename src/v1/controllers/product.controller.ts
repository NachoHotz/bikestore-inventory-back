import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as productService from '../services/product.service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const search = req.query.search as string;
    const { filter } = req.body;

    if (search) {
      const productsQuery = await productService.GetByQuery(search, next);

      if (!productsQuery || productsQuery.length === 0) {
        return next(new NotFoundException('No se encontraron productos con la busqueda solicitada'));
      }

      return res.status(200).send({ status: 200, productsQuery });
    }

    if (filter) {
      const productsFilter = await productService.GetByFilter(filter, next);

      if (!productsFilter || productsFilter.length === 0) {
        return next(new NotFoundException('No se encontraron productos con el filtro seleccionado'));
      }

      return res.status(200).send({ status: 200, productsFilter });
    }

    const allProducts = await productService.GetAll(next);

    if (!allProducts || allProducts.length === 0) {
      return next(new NotFoundException('No se encontraron productos'));
    }

    return res.status(200).send({ status: 200, allProducts });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllProducts controller: ${error.message}`));
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const uniqueProduct = await productService.GetOne(id, next);

    if (!uniqueProduct) {
      return next(new NotFoundException('No se encontro el producto solicitado'));
    }

    return res.status(200).send({ status: 200, uniqueProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error getOneProducts controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdProduct = await productService.Create(req.body, next);

    if (!createdProduct) return;

    return res.status(201).send({ status: 201, createdProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error createProduct controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const updatedProduct = await productService.Update(id, req.body, next);

    if (!updatedProduct) return;

    return res.status(200).send({ status: 200, message: 'Producto actualizado con éxito', updatedProduct });
  } catch (error: any) {
    /* handle error */
    return next(new InternalServerException(`Error updateProduct controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const removed = await productService.Delete(id, next);

    if (!removed) return;

    return res.status(200).send({ status: 200, message: 'Producto eliminado con éxito' });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteProduct controller: ${error.message}`));
  }
}
