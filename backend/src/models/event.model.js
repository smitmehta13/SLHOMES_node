import mongoose from "mongoose"

const { Schema } = mongoose; // Corrected line


const eventSchema = new Schema({
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
        enum : ["UpComing", "OnGoing", "Cancelled", "Closed"],
        default : "UpComing"
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

export { Event };
