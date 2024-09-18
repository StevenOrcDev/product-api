import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers';
import { validateDto } from '../middlewares';
import { CreateOrUpdateProductDTO, ProductIdParamsDTO } from '../dto';
import { SourceRequestDtoType } from '../entities';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', validateDto(ProductIdParamsDTO, SourceRequestDtoType.PARAMS), getProductById);
router.post('/', validateDto(CreateOrUpdateProductDTO), createProduct);
router.delete('/:id', validateDto(ProductIdParamsDTO, SourceRequestDtoType.PARAMS), deleteProductById);
router.patch(
  '/:id',
  validateDto(ProductIdParamsDTO, SourceRequestDtoType.PARAMS),
  validateDto(CreateOrUpdateProductDTO),
  updateProductById
);

export { router as productRoutes };
