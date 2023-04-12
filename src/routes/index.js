import ProductsRouter from "./products.routes.js";
import CartsRouter from "./carts.routes.js";
import UsersRouter from "./users.routes.js";
export const productsRouter = new ProductsRouter();
export const cartsRouter = new CartsRouter();
export const usersRouter = new UsersRouter();