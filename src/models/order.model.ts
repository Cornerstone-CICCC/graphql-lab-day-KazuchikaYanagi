import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    require: true,
  },
});

export const Order = mongoose.model("Order", OrderSchema);
