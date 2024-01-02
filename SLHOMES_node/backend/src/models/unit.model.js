import mongoose from "mongoose"

const unitSchema = mongoose.Schema({
    unitNumber : {
        type: String,
        required: true
    },
    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Property',
        required: true
    },
    occupiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    unitDescription: {
        type: String,
        required : true
    },
    rent: {
        type: Number,
        required : true
    }
},{timestamps : true})

const Unit = mongoose.model("Unit", unitSchema)