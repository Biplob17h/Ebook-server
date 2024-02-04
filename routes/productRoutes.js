import express from "express";
import {
  createAProduct,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
} from "../controller/productController.js";
import formidable from "express-formidable";

const productRouter = express.Router();

// POST
productRouter.post("/create", formidable(), createAProduct);

// GET
productRouter.get("/allProducts", getAllProducts);
productRouter.get("/product/photo", getProductPhoto);
productRouter.get("/product/single/:id", getSingleProduct);

export default productRouter;
