const express =require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app=express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT=process.env.PORT || 3000;

// Connected to MongoDB
connectDB();

app.get("/",(req,res)=>{
    res.send("WELCOME TO REBBIT API!");
});

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})


// 7:27:05 timestamp