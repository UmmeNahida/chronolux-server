import { Product } from "./product.model"

const createProduct = async(item:any)=>{
  const saveProduct = await Product.create(item)
  return saveProduct
}

const getProducts = async()=>{
  const products = await Product.find()

  return products
}


export const productServices = {
  createProduct,
  getProducts
}