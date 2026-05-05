

import {Router} from "express";
import { authController } from "./auth.controller";


const route = Router()

route.post("/login", authController.credentialsLogin)
route.post("/refresh-token", authController.getRefreshToken)
route.post("/logout",authController.logout)


export const authRoute = route;