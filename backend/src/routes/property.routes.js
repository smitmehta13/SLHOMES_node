import express from "express";
const router = express.Router();
import { getAllProperties } from "../controllers/propertyController.js";

// router.route("/").get(getAllProperties);
router.get("/", getAllProperties)


export default router