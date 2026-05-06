import { Request, Response } from "express";
import { Product } from "./product.model";

// create product
export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
};

// get all products 
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  res.json(products);
};

// get single product 
export const getSingleProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
};

// update 
export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
};

//delete
export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted successfully" });
};