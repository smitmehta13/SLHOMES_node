const mongoose = require("mongoose")

const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {  
        required: true,
        type: String
    },
    propertyImage: {
        type: String,
    },
    propertyType: {
        type: String,
        required : true
    }
    
},
{timestamps : true})