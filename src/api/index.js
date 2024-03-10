import productsModule from "./products";
import instance from "./instance";

export default {
  products: productsModule(instance),
  instance: instance,
};
