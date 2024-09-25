import request from 'supertest';
import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../../controllers';
import { productRoutes } from '../product.routes';

jest.mock('../../controllers', () => ({
  createProduct: jest.fn((req, res) => res.status(201).send('Product created')),
  deleteProductById: jest.fn((req, res) => res.status(200).send('Product deleted')),
  getAllProducts: jest.fn((req, res) => res.status(200).send('All products')),
  getProductById: jest.fn((req, res) => res.status(200).send('Product details')),
  updateProductById: jest.fn((req, res) => res.status(200).send('Product updated')),
}));

jest.mock('../../middlewares', () => ({
  validateDto: jest.fn().mockImplementation(() => (req, res, next) => next()),
}));
describe('Product Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/products', productRoutes);

  test('GET /products - should return all products', async () => {
    const response = await request(app).get('/products');

    expect(getAllProducts).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.text).toBe('All products');
  });

  test('GET /products/:id - should return product details', async () => {
    const response = await request(app).get('/products/1');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Product details');
    expect(getProductById).toHaveBeenCalled();
  });

  test('POST /products - should create a product', async () => {
    const newProduct = { name: 'New Product', price: 100 };

    const response = await request(app).post('/products').send(newProduct);

    expect(response.status).toBe(201);
    expect(response.text).toBe('Product created');
    expect(createProduct).toHaveBeenCalled();
  });

  test('DELETE /products/:id - should delete a product by id', async () => {
    const response = await request(app).delete('/products/1');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Product deleted');
    expect(deleteProductById).toHaveBeenCalled();
  });

  test('PATCH /products/:id - should update a product by id', async () => {
    const updatedProduct = { name: 'Updated Product', price: 150 };

    const response = await request(app).patch('/products/1').send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Product updated');
    expect(updateProductById).toHaveBeenCalled();
  });
});
