import { Router } from "express";
import { authRoute } from "../modules/Auth/auth.route";
import { productRouter } from "../modules/Products/product.route";

export const routes = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/product",
    route: productRouter,
  },
];

moduleRoutes.forEach((route)=>{
    routes.use(route.path, route.route)
})