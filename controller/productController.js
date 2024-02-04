import toInt from "validator";
import Product from "../model/productModel.js";
import fs from "fs";

const createAProduct = async (req, res) => {
  try {
    // GET PRODUCT DATA
    const { photo } = req.files;
    const { name,writer, price, discount, description, productLink } = req.fields;
    // CREATE PRODUCT
    const productData = {
      name,
      writer,
      price,
      discount,
      description,
      productLink,
      photo: {
        data: "",
        contentType: "",
      },
    };
    const product = new Product(productData);
    // MANAGE PHOTO
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // POST PRODUCT

    const result = await product.save();
    // SEND RES
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({
      status: "success",
      allProducts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getProductPhoto = async (req, res) => {
  try {
    const id = req.query.id;

    const query = {
      _id: id,
    };

    const photo = await Product.findOne(query).select("photo");

    if (photo?.photo?.data) {
      res.set("Content-type", photo.photo.contentType);
      res.send(photo.photo.data);
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const _id = req.params.id;

    const query = {
      _id: _id,
    };

    const product = await Product.findOne(query);

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { _id, name,writer, price, discount, productLink, description } = req.body;

    // FIND PRODUCT
    const product = await Product.findOne({ _id: _id });

    // update data
    product.name = name;
    product.writer = writer
    product.price = price;
    product.discount = discount;
    product.productLink = productLink;
    product.description = description;

    // UPADTE
    const result = await Product.updateOne({ _id: _id }, { $set: product });
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateProductPhoto = async (req, res) => {
  try {
    const { photo } = req.files;

    const _id = req.query.id;

    const product = await Product.findOne({ _id: _id });

    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;

    const result = await Product.updateOne({ _id: _id }, { $set: product });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const _id = req.query.id;

    const result = await Product.deleteOne({ _id: _id });
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  createAProduct,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  updateProduct,
  updateProductPhoto,
  deleteProduct,
};
