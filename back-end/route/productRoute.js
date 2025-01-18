import express from "express";
import { addProduct, getProductsList, deleteProduct, updateProduct, singleProduct } from "../controllers/productControllers.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add", adminAuth, addProduct);

productRouter.get("/list", getProductsList);

productRouter.post("/delete", adminAuth, deleteProduct);

productRouter.post("/update", adminAuth, updateProduct);

productRouter.post("/singleProduct", singleProduct);


export default productRouter;