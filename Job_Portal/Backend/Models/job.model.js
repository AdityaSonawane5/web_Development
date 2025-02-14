// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {  // Fixed typo from 'discription' to 'description'
//         type: String,
//         required: true
//     },
//     requirement: {  // Added type
//         type: String,
//         required: true
//     },
//     salary: {
//         type: Number,
//         required: true
//     },
//     experienceLevel: {
//         type: Number,
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     jobType: {
//         type: String,
//         required: true
//     },
//     position: {
//         type: Number,
//         required: true
//     },
//     company: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Company", // Ensure it matches the actual model name
//         required: true
//     },
//     created_by: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", // Ensure it matches the actual model name
//         required: true
//     },
//     application: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Application"
//     }]
// }, { timestamps: true });

// export const Job = mongoose.model("Job", jobSchema);


import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirement: {  
        type: [String], // Fixed type to an array
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: { 
        type: String, // Fixed from Number to String
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
