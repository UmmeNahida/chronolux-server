import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  brand: String,
  model: String
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);