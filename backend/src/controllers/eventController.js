import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Event } from "../models/event.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const getAllEvents = asyncHandler( async( req, res) => {
    const events = await Event.find({})
    return res.status(200).json(
        new ApiResponse(200,events,"Events fetched Successfully")
    )
})

const createEvents = asyncHandler(async(req, res) => {
    // get data from body
    // check if fields are not empty
    // upload file to cloudnairy
    // check if upload properly
    // get url
    // make a event object
    // save to db
    // check if created or not
    // return to user
    try {
        const {
            eventName,
            eventDetails,
            eventDateTime,
            eventLocation,
            capacity,
            eventStatus,
            fee
        } = req.body
    
        if([eventName,
            eventDetails,
            eventDateTime,
            eventLocation,
            capacity,
            eventStatus]
            .some((field)=> field?.trim() === undefined || field?.trim() === '')) {
                throw new ApiError(400, "All Fields are required")
        }
    
        const existingEvent = await Event.findOne({
            $or : [{eventName}, {eventDetails}]
        })
        if(existingEvent){
            throw new ApiError(409, "Event already exist...")
        }
        const eventBannerLocalPath = req.files?.eventBanner[0]?.path
    
        if (!eventBannerLocalPath) {
            throw new ApiError(400, "Event Banner required")
        }
        const banner = await uploadOnCloudinary(eventBannerLocalPath)
        
        if (!banner) {
            throw new ApiError(400, "Event Banner required")
        }
        const event = await Event.create({
            eventName,
            eventDetails,
            eventDateTime,
            eventLocation,
            capacity,
            eventStatus,
            fee : fee || 0,
            eventBanner : banner.url
        })
    
        const createdEvent = await Event.findOne(event._id)
    
        if (!createdEvent) {
            throw new ApiError(500, "Event Creation Went Wrong")
        }
    
        return res.status(201)
        .json(
            new ApiResponse(201,createdEvent,"Event Created Successfully")
        )
    } catch (error) {
        throw new ApiError(error.statusCode,error.message)
    }

})

export {getAllEvents, createEvents}