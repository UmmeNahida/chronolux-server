import { Product } from "./product.model"

const createProduct = async(item:any)=>{
  const saveProduct = await Product.create(item)
  return saveProduct
}

const getProducts = async()=>{
  const products = await Product.find()

  return products
}


const productDetails = async(id:string)=>{
  const product = await Product.findById(id)

  return product
}


const updateProduct = async(id:string | string[], updateInfo:any)=>{
  const product = await Product.findByIdAndUpdate(
      id,
      updateInfo,
      {new: true}
    );

  return product
}

const deletedProduct = async(req:any)=>{
  const product = await Product.findByIdAndDelete(req.params.id)

  return product
}

export const productServices = {
  createProduct,
  getProducts,
  productDetails,
  updateProduct,
  deletedProduct
}