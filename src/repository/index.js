import ProductRepository from "./product.repository.js";
import UserRepository from "./user.repository.js";
import CartRepository from "./cart.repository.js";
import { Product, User, Cart } from "../dao/factory.js";

import RecoveryCode from "../dao/mongo/recoverycodes.mongo.js";

export const productService = new ProductRepository(new Product());
export const userService = new UserRepository(new User());
export const cartService = new CartRepository(new Cart());


export const recoveryCodeService = new RecoveryCode();