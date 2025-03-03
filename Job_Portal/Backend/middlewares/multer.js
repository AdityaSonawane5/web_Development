// import multer from "multer"

// const stroage=multer.memoryStorage();
// export const SingleUpload=multer({stroage}).single("file")

import multer from "multer";

const storage = multer.memoryStorage(); // Fix the typo here
export const SingleUpload = multer({ storage }).single("file"); // Use "storage"
