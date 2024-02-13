import express from "express"
const router = express.Router()
import {createUnit, getAllUnits} from "../controllers/unitController.js"

router.route("/create").post(createUnit)
router.route("/").get(getAllUnits)

export default router