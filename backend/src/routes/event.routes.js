import { getAllEvents, createEvents, getActiveEvents, updateEvents, deleteEvents } from "../controllers/eventController.js"; 
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
router.route("/active").get(getActiveEvents)
router.route("/update").patch(
    upload.fields([
        {
            name: "eventBanner",
            maxCount: 1
        }
    ]),
    updateEvents
)
router.route("/delete").delete(deleteEvents)

export default router