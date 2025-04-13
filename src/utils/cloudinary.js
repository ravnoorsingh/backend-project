import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"        // https://nodejs.org/api/fs.html

// fsPromises.unlink(path)#
// Added in: v10.0.0
// path <string> | <Buffer> | <URL>
// Returns: <Promise> Fulfills with undefined upon success.
// If path refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the path refers to a file path that is not a symbolic link, the file is deleted. See the POSIX unlink(2) documentation for more detail.

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        })
        // file gas been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        // if there is an issue in uploading the file to a cloudinay server then we should remove the file from our local server as well to get rid of malicious files
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// cloudinary.v2.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", 
//     { public_id: "olympic_flag"}, 
//     function(error, result) {console.log(result);}
// );


export {uploadOnCloudinary}




