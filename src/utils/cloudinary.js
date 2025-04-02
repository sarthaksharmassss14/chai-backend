import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APISECRET
});

const uploadoncloudinary= async (localfilepath)=>{
    try {
        if(!localfilepath) return null
        const response= await cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto"
            
        })  
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null
    }
}

export {uploadoncloudinary}