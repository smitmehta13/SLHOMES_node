import { getAllEvents, createEvents } from "../controllers/eventController.js"; 
import express from "express"
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router()

router.route("/").get(getAllEvents)
router.route("/create").post(
    upload.fields([
        {
            name: "eventBanner",
            maxCount: 1
        }
    ]),
    createEvents
    )

export default router