import { productInterface, ProductQuery } from "./product.interface";
import { Product } from "./product.model"

const createProduct = async(item: productInterface)=>{
  const saveProduct = await Product.create(item)
  return saveProduct
}

const getProducts = async (query: ProductQuery) => {
  const { category, price, rating, startDate, endDate, page, limit } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const [min, max] = price?.split("-") || [];

  const filter: any = {};

  // category filter
  if (category) {
    filter.category = category;
  }

  // price filter
  if (min || max) {
    filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);
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

  const [products, total] = await Promise.all([
  Product.find(filter).skip(skip).limit(limit || 5),
  Product.countDocuments(filter),
]);

return {
  meta: {
    page: Number(page),
    limit,
    total,
    totalPage: Math.ceil(total / limit),
  },
  data: products,
};
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