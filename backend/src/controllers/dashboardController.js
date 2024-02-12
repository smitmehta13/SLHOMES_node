import { Property } from "../models/property.model.js";
import { User } from "../models/user.model.js"
import { Event } from "../models/event.model.js";
import { Unit } from "../models/unit.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const dashboardData = asyncHandler(async(req, res) => {
    const  totalUnits = await Unit.aggregate([
        {
            $count: "totalUnits"
        }
    ])
    const totalUsers = await User.aggregate([
        {
            $count: "totalUsers"
        }
    ])
    const totalEvents = await Event.aggregate([
        {
            $count: "totalEvents"
        }
    ])
    return res.status(200).json(
        new ApiResponse(200,
            {
                "Total Units" : totalUnits[0].totalUnits,
                "Total Users" : totalUsers[0].totalUsers,
                "Total Events" : totalEvents[0].totalEvents
            }
            ,"Dashboard data fetched successfully")
    )
})

export {dashboardData}