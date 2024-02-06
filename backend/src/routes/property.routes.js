import express from "express";
const router = express.Router();
import { createProperties, getAllProperties } from "../controllers/propertyController.js";
import {upload } from "../middlewares/multer.middleware.js"

// router.route("/").get(getAllProperties);
router.get("/", getAllProperties)
router.post("/create", upload.fields([
    {
    name : "propertyImage",
    maxCount:1
    }
]),createProperties)


export default router