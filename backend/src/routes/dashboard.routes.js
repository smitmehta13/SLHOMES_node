import { dashboardData } from "../controllers/dashboardController.js";
import express from "express"
const router = express.Router()

router.route("/dashboard").get(dashboardData)

export default router