import { Request, Response } from "express";
import { Product } from "./product.model";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { productServices } from "./product.services";

// create product
export const createProduct = async (req: Request, res: Response) => {
  const product = await productServices.createProduct(req.body)

  sendResponse(res, {
    success:true,
    statusCode: httpStatus.OK,
    data: product,
    message: "product has been created"
  })
};

// get all products 
export const getProducts = async (req: Request, res: Response) => {
  const products = await productServices.getProducts();

   sendResponse(res, {
    success:true,
    statusCode: httpStatus.OK,
    data: products,
    message: "product has been retrieve"
  })
};

// get single product 
export const getSingleProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  sendResponse(res, {
    success:true,
    statusCode: httpStatus.OK,
    data: product,
    message: "single product has been retrieve"
  })
};

// update 
export const updateProduct = async (req: Request, res: Response) => {
  const product = await productServices.updateProduct(req.params.id, req.body)

  sendResponse(res, {
    success:true,
    statusCode: httpStatus.OK,
    data: product,
    message: "product has been updated"
  })
};

//delete
export const deleteProduct = async (req: Request, res: Response) => {
    await productServices.deletedProduct(req)

    sendResponse(res, {
    success:true,
    statusCode: httpStatus.OK,
    data:null,
    message: "product has been deleted"
  })
};