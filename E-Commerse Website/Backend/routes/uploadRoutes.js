// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");
// const { route } = require("./userRoutes");

// require("dotenv").config();

// const router = express.Router();

// // Cloudinary configurate 

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_SECRET_KEY,
// });


// // Multer setup using memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/", upload.single("image"), async (req,res)=>{
//     try {
//         if (!req.file){
//             return res.status(400).json({ message: "NO File Uplaod" });
//         }

//         // Fuction to Handel the steam upload to Cloudinary
//         const streamUpload = (fileBuffer)=>{
//             return new Promise ((resolve,reject)=>{
//                 const stream = cloudinary.uploader.upload_stream((error,resolve)=>{
//                     if (result){
//                         resolve(result);
//                     }else{
//                         reject(error);
//                     }
//                 });

//                 // Use streamifire to convert file buffer to a steam 
//                 streamifier.createReadStream(fileBuffer).pipe(stream);
//             });
//         };

//         // call the stream function
//         const result = await streamUpload(req.file.buffer);

//         // Response with the upload Image URL
//         res.json({ imageUrl : result.secure_url});

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports=router














const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                // Convert file buffer to stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Call the stream upload function
        const result = await streamUpload(req.file.buffer);

        // Respond with the uploaded image URL
        res.json({ imageUrl: result.secure_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
