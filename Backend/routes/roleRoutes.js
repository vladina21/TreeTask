import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
  insertRole,
  getRolesList,
  deleteRole,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/insert", insertRole);

router.get("/get-roles", protectRoute, isAdminRoute, getRolesList);

// //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .delete(protectRoute, isAdminRoute, deleteRole);

export default router;