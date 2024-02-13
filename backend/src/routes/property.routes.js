import express from "express";
const router = express.Router();
import { createProperties, deleteProperty, getAllProperties, updateProperty } from "../controllers/propertyController.js";
import {upload } from "../middlewares/multer.middleware.js"

// router.route("/").get(getAllProperties);
router.get("/", getAllProperties)
router.post("/create", upload.fields([
    {
    name : "propertyImage",
    maxCount:1
    }
]),createProperties)
router.patch("/update", updateProperty)
router.delete("/delete", deleteProperty)


export default router