import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/db.js';

dotenv.config({
    path: "./.env"
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is Running", process.env.PORT);
      console.log(`http://Localhost:${process.env.PORT}/`);
    });
    app.get('/', (req, res) => {
        res.send("hello")
    })
    app.on("error", (error) => { 
      console.log("ERR: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed", err);
  });
