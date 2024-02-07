import { Property } from "../models/property.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).json(
      new ApiResponse(200, properties, "Fetched all properties")
    )
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Invalid Request")
    );
  }
});

const createProperties = asyncHandler(async(req, res) => {

  const { title, description, propertyType } = req.body

  if ([title,description,propertyType].some((field)=> field?.trim() === "")) {
      throw new ApiError(403, "All Fields are required")
  }
  const propertyImagePath = req.files?.propertyImage[0]?.path

  if (!propertyImagePath) {
    throw new ApiError(403, "Property Image Required")
  }

  const propertyImage = await uploadOnCloudinary(propertyImagePath)

  const existingProperty = await Property.find({title: title})

  if (existingProperty.length > 0) {
    throw new ApiError(401, "Property Already Exist")
  }

  const property = await Property.create({title,description,propertyType,propertyImage})

  res.status(200).json({property})

})

const updateProperty = asyncHandler(async(req, res) => {

  const updatedProperty = req.body

  const results = await Property.findByIdAndUpdate(updatedProperty._id,updatedProperty,{new:true})

  res.status(200).json(results)
})

const deleteProperty = asyncHandler(async(req, res) => {
  const deletedProperty = req.body

  if (!deletedProperty._id) {
    throw new ApiError(401, "ID Fields is Required")
  }

  const results = await Property.findByIdAndDelete(deletedProperty._id,{new:true})

  res.status(200).json(results)
})
export { getAllProperties, createProperties, updateProperty, deleteProperty };
