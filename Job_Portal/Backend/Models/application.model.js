import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        require: true
    },
    appicant:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending",
    }

},{timestamps:true})

export const application=mongoose.model("appliation",ApplicationSchema);