import mongoose from "mongoose"

const userSchema = new mongoose.schema({
   // id: { type: String, required: true, index: true, auto: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, length: 10 },
    address: { type: String, required: true },
    postalCode: { type: String, required: true, length: 6 },
    dateOfBirth: { type: Date, required: true },
    collegeName: { type: String, required: true },
    studentId: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    },{timestamps : true});

export const User = mongoose.model("User", userSchema);