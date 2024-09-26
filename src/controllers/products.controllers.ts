// controllers/product.controller.ts
import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { ProductModel } from '../models';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneBy({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  const product = { name, price, description };
  try {
    const newProduct = Product.create(product);
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneBy({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.remove(product);
    return res.status(200).json({
      message: 'Product deleted successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productToUpdate: ProductModel = req.body;
  try {
    const product = await Product.findOneBy({ id: parseInt(id) });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, productToUpdate);
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};
