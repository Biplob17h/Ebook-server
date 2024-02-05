import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const Orders = mongoose.model("orders", orderSchema);
export default Orders;
