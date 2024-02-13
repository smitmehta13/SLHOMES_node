import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("Local file path is missing");
            return null;
        }

        // Ensure Cloudinary environment variables are set
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error("Cloudinary environment variables not set");
            return null;
        }

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Check if the upload was successful
        if (response && response.public_id) {
            fs.unlinkSync(localFilePath);
            return response.url;
        } else {
            console.error("Cloudinary upload failed:", response);
            fs.unlinkSync(localFilePath);
            return null;
        }
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
