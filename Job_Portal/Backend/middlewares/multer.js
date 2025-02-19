import multer from "multer"

const stroage=multer.memoryStorage();
export const SingleUpload=multer({stroage}).single("file")