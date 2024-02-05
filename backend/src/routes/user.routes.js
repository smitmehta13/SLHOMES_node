// ./routes/user.js
import express from "express";
const router = express.Router();
import { getAllUsers, getUserById, createNewUser, updateUser, deleteUser, changeUserPassword} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/create", createNewUser);
router.post("/update", updateUser);
router.delete("/:id", deleteUser);
router.patch("/update-password", verifyJWT, changeUserPassword)

export default router;
