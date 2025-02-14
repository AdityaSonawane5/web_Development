import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import JobRouter from "./routes/job.route.js";
import ApplicationRouter from "./routes/application.route.js";



dotenv.config({});

const app=express();


// middelwares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const coreOptions={
    origin:'https//localhost:5173',
    Credentials:true
}

app.use(cors(coreOptions));
const PORT=process.env.PORT || 3000;


// api
// for user
app.use("/api/v1/User",userRoute);

// for company
app.use("/api/v1/Company",companyRoute);

// for jobs

app.use("/api/v1/Job",JobRouter);

app.use("/api/v1/Application",ApplicationRouter);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running in port :${PORT}`)
})


