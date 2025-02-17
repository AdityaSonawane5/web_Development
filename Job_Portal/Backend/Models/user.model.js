import mongoose, { Schema } from "mongoose";
// import { Company } from "./company.model.js";
// import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["student","recuriter"]
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOrignalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

export const User=mongoose.model("User",UserSchema)

