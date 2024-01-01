require('dotenv').config()
// const mongoose = require("mongoose");
// import { app  } from "server.js"
// import { DB_NAME } from "./constants";
import connectDB from "./db/db";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log("Server is Running" , process.env.PORT);
    })
    app.on("error", (error) => { 
        console.log("ERR : ", error);
        throw error
    })
}).catch((err) => {
    console.log("MongoDB Connection Failed", err);
})