import { Property } from "../models/property.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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

export { getAllProperties };
