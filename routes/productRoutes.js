import express from "express";
import {
  createAProduct,
  deleteProduct,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  updateProduct,
  updateProductPhoto,
} from "../controller/productController.js";
import formidable from "express-formidable";

const productRouter = express.Router();

// POST
productRouter.post("/create", formidable(), createAProduct);

// GET
productRouter.get("/allProducts", getAllProducts);
productRouter.get("/product/photo", getProductPhoto);
productRouter.get("/product/single/:id", getSingleProduct);

// UPDATE
productRouter.patch("/product/update", updateProduct);
productRouter.patch("/product/photo", formidable(), updateProductPhoto);

// DELETE
productRouter.delete("/product", deleteProduct);

export default productRouter;
