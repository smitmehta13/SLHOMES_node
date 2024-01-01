const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try{
        res.status(200).json({message: "Get all userS"});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

const getUserById = async (req, res) => {
    try{
        res.status(200).json({message: "Get user by id"});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

 module.exports = { getAllUsers,
                    getUserById };