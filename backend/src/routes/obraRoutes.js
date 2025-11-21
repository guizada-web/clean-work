import express from "express";
import { getObras, postObra, putObra, deleteObra } from "../controllers/obraControler.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getObras);
router.post("/", authenticateToken, postObra);
router.put("/:id", authenticateToken, requireAdmin, putObra);
router.delete("/:id", authenticateToken, requireAdmin, deleteObra);

export default router;
