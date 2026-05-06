import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { deleteProduct, getSingleProduct, updateProduct } from "./product.controller";



const router = Router();

router.post('/create',)
router.get("/products/:id", getSingleProduct);
router.patch("/products/:id", checkAuth("admin"), updateProduct);
router.delete("/products/:id", checkAuth("admin"), deleteProduct);

export const productRouter = router;

