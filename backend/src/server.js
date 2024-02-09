import express, { Router } from "express"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import endpointsRouter from './routes/home.routes.js';
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js"
import propertyRouter from "./routes/property.routes.js";
import unitRouter from "./routes/unit.routes.js"

const app = express()

// Enable CORS for a specific origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,  // Include if you're sending cookies or credentials
  }));
  
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory using the current module's directory
const __filename = import.meta.url.substring(7);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));


app.use("/api/users", userRouter,authRouter)
app.use("/api/property", propertyRouter)
app.use('/api', endpointsRouter);
app.use("/api/events", eventRouter)
app.use("/api/units", unitRouter)




export { app }