import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name is too short"],
    trim: true,
    required: true,
    default: "Book name",
  },
  price: {
    type: String,
    required: [true, "Provide a valid price"],
    default: "0",
  },
  discount: {
    type: String,
    default: "0",
  },
  description: {
    type: String,
    trim: true,
    minLength: [10, "Book description is too short"],
  },
  writer: {
    type: String,
    trim: true,
    required: true,
  },
  productLink: {
    type: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const Product = mongoose.model("products", productSchema);

export default Product;
