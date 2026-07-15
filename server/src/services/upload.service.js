import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (
  filePath,
  folder,
  resourceType = "image"
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
    });
  

    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};