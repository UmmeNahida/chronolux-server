import mongoose from "mongoose";
import { number } from "zod";

const productSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  brand: String,
  model: String,
  rating: number,
  review: String
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);