import { Router } from "express";
import { authRoute } from "../modules/Auth/auth.route";

export const routes = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/product",
    route: authRoute,
  },
];

moduleRoutes.forEach((route)=>{
    routes.use(route.path, route.route)
})