// this is from chatgpt
import DataUriParser from 'datauri/parser.js';
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // Corrected line
    return parser.format(extName, file.buffer); // Ensure content is returned
}

export default getDataUri;
