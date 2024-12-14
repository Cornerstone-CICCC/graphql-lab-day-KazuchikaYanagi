import { Order } from "../models/order.model";

export interface IOrder {
  id: string;
  productId: string;
  customerId: string;
}

const getOrders = async () => {
  const orders = await Order.find();
  console.log(orders);
  return orders;
};

const createOrder = async (data: Omit<IOrder, "id">) => {
  const order = new Order(data);
  return await order.save();
};

const updateOrder = async (id: string, data: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
