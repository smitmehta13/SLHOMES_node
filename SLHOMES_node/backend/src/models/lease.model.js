import mongoose from "mongoose"

const leaseSchema = mongoose.Schema({
    leaseAmount : {
        type : Number,
        required : true
    },
    leaseHolder :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    leaseStartDate : {
        type : Date,
    required : true
    },
    leaseEndDate : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ["PENDING", "CANCELLED", "APPROVED"],
        default : "PENDING"
    }
},{timestamps : true})