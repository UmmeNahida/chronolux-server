import { Product } from "./product.model"

const createProduct = async(item:strig)=>{
  const saveProduct = await Product.create(item)
  return saveProduct
}

const getProducts = async (query: any) => {
  const { category, minPrice, maxPrice, rating, startDate, endDate } = query;

  const filter: any = {};

  // category filter
  if (category) {
    filter.category = category;
  }

  // price filter
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // rating filter
  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }

  // date filter
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  const products = await Product.find(filter);

  return products;
};

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