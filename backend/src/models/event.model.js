import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
    eventName : {
        type : String,
        required : true,
        index : true
    },
    eventDetails : {
        type : String,
        required : true
    },
    eventDateTime : {
        type : Date,
        required : true
    },
    eventLocation : {
        type : String,
        required : true
    },
    capacity : {
        type : Number,
        required : true
    },
    eventStatus :{
        type : String,
        enum : ["UPCOMING", "ONGOING", "CANCELLED", "CLOSED"],
        default : "UPCOMING"
    },
    fee : {
        type : Number,
        default : 0
    },
    eventBanner : {
        type : String,
        required : true
    }
},{timestamps : true});

const Event = mongoose.model("Event", eventSchema);