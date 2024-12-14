import customerController, {
  ICustomer,
} from "../controllers/customer.controller";
import orderController, { IOrder } from "../controllers/order.controller";
import productController, { IProduct } from "../controllers/product.controller";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { productId }: { productId: string }) =>
      await productController.getProductById(productId),
    getCustomerById: async (
      _: unknown,
      { customerId }: { customerId: string }
    ) => await customerController.getCustomerById(customerId),
  },
  Product: {
    customers: async (parent: { customerId: string }) =>
      await customerController.getCustomerById(parent.customerId),
  },
  Customer: {
    products: async (parent: { productId: string }) =>
      await productController.getProductById(parent.productId),
  },
  Order: {
    product: async (parent: { productId: string }) =>
      await productController.getProductById(parent.productId),
    customer: async (parent: { customerId: string }) =>
      await customerController.getCustomerById(parent.customerId),
  },
  Mutation: {
    addProduct: async (
      _: unknown,
      { productName, productPrice }: Omit<IProduct, "id">
    ) => await productController.createProduct({ productName, productPrice }),
    editProduct: async (
      _: unknown,
      { id, productName, productPrice }: IProduct
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: unknown,
      { firstName, lastName, email }: Omit<ICustomer, "id">
    ) =>
      await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async (
      _: unknown,
      { id, firstName, lastName, email }: ICustomer
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),
    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    addOrder: async (_: unknown, { productId, customerId }: IOrder) =>
      await orderController.createOrder({ productId, customerId }),
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) =>
      await orderController.updateOrder(id, {
        customerId,
        productId,
      }),
    removeOrder: async (_: unknown, { id }: { id: string }) =>
      await orderController.deleteOrder(id),
  },
};
