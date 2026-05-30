import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
// import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "./product.controller";
import * as controller from "./product.controller"



const router = Router();

router.post('/create',controller.createProduct)
router.get('/',controller.getProducts)
router.get("/:id", controller.getSingleProduct);
router.patch("/update/:id", checkAuth("admin"), controller.updateProduct);
router.delete("/delete/:id", checkAuth("admin"), controller.deleteProduct);

export const productRouter = router;

