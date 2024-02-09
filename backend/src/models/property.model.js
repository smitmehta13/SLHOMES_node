import mongoose from "mongoose"
const { Schema } = mongoose

const propertySchema = new Schema({
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
    },
    units: [
                {
                  type: mongoose.Schema.Types.ObjectId,
                  ref:'Unit'
                }
            ]
    
},
{timestamps : true})

const Property = mongoose.model("Property", propertySchema)

export { Property };