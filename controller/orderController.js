import Orders from "../model/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { productId, email } = req.body;

    const orderData = {
      productId: productId,
      userEmail: email,
    };
    const Order = new Orders(orderData);

    const result = await Order.save();
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

export const getAllOrders = async (req, res) => {
    try {
        const email = req.query.email;
      const allOrders = await Orders.find({userEmail: email});
      res.status(200).json({
        status: "success",
        allOrders,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  };
