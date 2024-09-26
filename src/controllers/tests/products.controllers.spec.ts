import { Product } from '../../entities';
import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } from '../products.controllers';

// for mock use the exact path of the file because jest will not understand the alias
jest.mock('../../entities/Product', () => ({
  Product: {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  },
}));

describe('ProductsController', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    const req: any = {};
    test('should return all products with status 200', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
      ] as Product[];

      jest.spyOn(Product, 'find').mockResolvedValue(mockProducts);

      await getAllProducts(req, res);

      expect(Product.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    test('should return status 500 if there is an error', async () => {
      (Product.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await getAllProducts(req, res);

      expect(Product.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving products' });
    });
  });

  describe('getProductById', () => {
    const req: any = {
      params: { id: 1 },
    };
    test('should return a product with status 200', async () => {
      const mockProduct = { id: 1, name: 'Product A' };

      (Product.findOneBy as jest.Mock).mockResolvedValue(mockProduct);

      await getProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    test('should return 404 if product is not found', async () => {
      (Product.findOneBy as jest.Mock).mockResolvedValue(null);

      await getProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    test('should return 500 if there is a server error', async () => {
      (Product.findOneBy as jest.Mock).mockRejectedValue(new Error('Database error'));

      await getProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving product' });
    });
  });

  describe('createProduct', () => {
    const req: any = {
      body: { name: 'New Product', price: 100, description: 'A new product' },
    };
    test('should create a product with status 201', async () => {
      const mockProduct = { id: 1, name: 'New Product', price: 100, description: 'A new product', save: jest.fn().mockResolvedValue(true) };
      (Product.create as jest.Mock).mockReturnValue(mockProduct);

      await createProduct(req, res);

      expect(Product.create).toHaveBeenCalledWith({ name: 'New Product', price: 100, description: 'A new product' });
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    test('should create a product with status 500', async () => {
      const mockProduct = { save: jest.fn().mockRejectedValue(new Error('Fake error')) };
      (Product.create as jest.Mock).mockReturnValue(mockProduct);

      await createProduct(req, res);

      expect(Product.create).toHaveBeenCalled();
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating product' });
    });
  });

  describe('deleteProductById', () => {
    const req: any = {
      params: { id: 1 },
    };
    test('should delete a product with status 200', async () => {
      const mockProduct = { id: 1, name: 'Product A' };

      (Product.findOneBy as jest.Mock).mockResolvedValue(mockProduct);
      (Product.remove as jest.Mock).mockResolvedValue(mockProduct);

      await deleteProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(Product.remove).toHaveBeenCalledWith(mockProduct);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Product deleted successfully',
        product: mockProduct,
      });
    });

    test('should return 404 if product is not found', async () => {
      (Product.findOneBy as jest.Mock).mockResolvedValue(null);

      await deleteProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(Product.remove).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    test('should return 500 if there is an error during deletion', async () => {
      const mockProduct = { id: 1, name: 'Product A' };

      (Product.findOneBy as jest.Mock).mockResolvedValue(mockProduct);
      (Product.remove as jest.Mock).mockRejectedValue(new Error('Error deleting product'));

      await deleteProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(Product.remove).toHaveBeenCalledWith(mockProduct);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting product' });
    });
  });

  describe('updateProductById', () => {
    const req: any = {
      params: { id: 1 },
      body: { name: 'Updated Product', price: 200 },
    };
    test('should update a product with status 200', async () => {
      const mockProduct = { id: 1, name: 'Old Product', price: 100, save: jest.fn().mockResolvedValue(true) };

      (Product.findOneBy as jest.Mock).mockResolvedValue(mockProduct);

      await updateProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockProduct.save).toHaveBeenCalled();
      expect(mockProduct.name).toBe('Updated Product');
      expect(mockProduct.price).toBe(200);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    test('should return 404 if product is not found', async () => {
      (Product.findOneBy as jest.Mock).mockResolvedValue(null);

      await updateProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    test('should return 500 if there is an error during update', async () => {
      const mockProduct = { id: 1, name: 'Old Product', price: 100, save: jest.fn().mockRejectedValue(new Error('Database error')) };

      (Product.findOneBy as jest.Mock).mockResolvedValue(mockProduct);

      await updateProductById(req, res);

      expect(Product.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating product' });
    });
  });
});
