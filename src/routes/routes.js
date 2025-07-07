import { Router } from "express";
import {
  registerUser,
  getProductsList,
  addProduct,
  updateProduct,
  deleteProduct,
  createCart,
  removeItemsFromCart,
} from "../controllers/controller.js";
import { protectRoute } from "../middleware/middleware.js";

const router = Router();

router.post("/register-user", registerUser);

router.get("/products", protectRoute, getProductsList);
router.post("/add-product", protectRoute, addProduct);
router.patch("/update-product/:id", protectRoute, updateProduct);
router.delete("/delete-product/:id", protectRoute, deleteProduct);

router.post("/add-cart", protectRoute, createCart);
router.post("/remove-cartitems", protectRoute, removeItemsFromCart);

export default router;
