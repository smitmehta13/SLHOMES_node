const mongoose = require("mongoose")

const maintenanceSchema = mongoose.Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    requestImage : {
        type : String,
        required : true
    },
    requestDescription : {
        type : String,
        required : true
    },
    remarks : {
        type : String
    },
    status : {
        type : String,
        enum : ["OPEN", "CLOSED"],
        default : "OPEN"
    }
},{timestamps : true})