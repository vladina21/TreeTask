import express from 'express';
import userRoutes from './userRoutes.js';
import nodeRoutes from './nodeRoutes.js';
import roleRoutes from './roleRoutes.js';
import taskRoutes from './taskRoutes.js';


const router = express.Router();

router.use("/user", userRoutes);
router.use("/node", nodeRoutes);
router.use("/role", roleRoutes);
router.use("/task", taskRoutes);


export default router;