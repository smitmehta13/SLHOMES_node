import { Unit } from "../models/unit.model.js";
import { Property } from "../models/property.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createUnit = asyncHandler(async(req, res) => {
    const {unitNumber,
    property,
    unitDescription,
    rent} = req.body

    const propertyData = await Property.findOne({title : property})
    const unitData = await Unit.create({
        unitNumber: unitNumber,
        property: propertyData._id,
        unitDescription: unitDescription,
        rent : rent})

        return res.status(201).json(unitData)

})

const getAllUnits = asyncHandler(async(req, res)=>{
    const unitData = await Unit.find({})

    return res.status(200).json(
        new ApiResponse(200,unitData,"units fetched successfully")
    )
})

export {createUnit, getAllUnits}