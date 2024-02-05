import { connectDB } from "../db/db.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const getAllUsers = asyncHandler (async (req, res) => {
    try {
        let results = await User.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})

const getUserById = asyncHandler(async (req, res) => {
    try {
        const fetchedUser = await User.findById(req.params['id'])

        if (fetchedUser == null) {
            throw new ApiError(404,"user not found")
        }
        return res.status(200).json(new ApiResponse(200,fetchedUser,"fetched user succesfully"))
    } catch (error) {
        return res.status(error.statusCode).json({statuscode: error.statusCode, error: error?.message})
    }
});

const createNewUser = asyncHandler(async (req, res) => {
    try {

        //get data from user
        //validation - not empty
        //check if user already exist
        //create user object and enter into DB
        //remove password and refresh token field from response
        //check for user creation
        //return the response

        const { firstName, lastName, email, password, phoneNumber, address, postalCode, dateOfBirth, collegeName, studentId, isAdmin} = req.body
        if([firstName, lastName, email, password, phoneNumber, address, postalCode, dateOfBirth, collegeName, studentId, isAdmin].some((field) => field?.trim() === "")){
            throw new ApiError(400, "All Fields are required")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new ApiError(409, "User already exist with same email...")
        }
        const user = await User.create({
            firstName, lastName, 
            email, password,
             phoneNumber, address, 
             postalCode, dateOfBirth, 
             collegeName, studentId, 
             isAdmin  
        })

        const createdUser = await User.findById(user._id).select("-password")

        if(!createdUser){
            throw new ApiError(500, "something went wrong while creating user")
        }
         return res.status(201).json(
            new ApiResponse(200, createdUser, "User Registered successfully")
         )
   
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

const updateUser = asyncHandler(async (req, res) => {
    try {
        console.log("got update req");
        const updatedData = req.body;

        console.log("updating ...");
        // Use findOneAndUpdate to directly update the document in the database
        const updatingUser = await User.findOneAndUpdate(
            { email: updatedData.email },
            { $set: { password: updatedData.password,
            email: updatedData.email,
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            phoneNumber: updatedData.phoneNumber,
            address: updatedData.address,
            postalCode: updatedData.postalCode,
            dateOfBirth: updatedData.dateOfBirth,
            collegeName: updatedData.collegeName,
            studentId: updatedData.studentId,
            isAdmin: updatedData.isAdmin } },
            { new: true } // Return the updated document
        );

        console.log("update successful");
        res.status(200).json({ updatedData: updatingUser });
    } catch (error) {
        console.error("update failed", error);
        res.status(403).json({ message: error?.message });
    }
});

const deleteUser = asyncHandler(async (req, res) =>{
    await User.findByIdAndDelete(req.params['id'])
    return res.status(200).json("deleted successfully")

})

const changeUserPassword = asyncHandler(async(req, res) => {
try {
    
        const {currentPassword, newPassword} = req.body
    
        const user = await User.findById(req.user._id)
    
         const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)
    
         if (!isPasswordCorrect) {
                throw new ApiError(400,"Invalid Password")
         }
    
        user.password = newPassword
    
        await user.save({validateBeforeSave: false})
    
        return res.status(200).json(
            new ApiResponse(200,{},"Password Changed Successfully")
        )
} catch (error) {
    throw new ApiError(error.statusCode,error?.message || "Inavlid password request")
}
})


export { getAllUsers, getUserById, createNewUser, updateUser, deleteUser, changeUserPassword};
