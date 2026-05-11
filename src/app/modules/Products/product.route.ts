import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "./product.controller";



const router = Router();

router.post('/create',createProduct)
router.post('/',getProducts)
router.get("/details/:id", getSingleProduct);
router.patch("/update/:id", checkAuth("admin"), updateProduct);
router.delete("/delete/:id", checkAuth("admin"), deleteProduct);

export const productRouter = router;

