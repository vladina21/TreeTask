import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  insertNode,
  getNodesList,
  deleteNode,
  updateNode,
} from "../controllers/nodeController.js";

const router = express.Router();

router.post("/insert", insertNode);

router.get("/get-nodes", protectRoute, isAdminRoute, getNodesList);
router.put("/profile", protectRoute, updateNode);

// //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .delete(protectRoute, isAdminRoute, deleteNode);

export default router;