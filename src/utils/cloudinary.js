import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (loacalFilePath) => {
    try {
        if(!loacalFilePath) return null
        const response = await cloudinary.uploader.upload(loacalFilePath, {
            resource_type: "auto"
        })
        console.log(`The file has been successfully uploaded on cloudinary`)
        fs.unlinkSync(loacalFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(loacalFilePath)
        console.error(`Cloudinary upload error ${error}`)
    }
}

const deleteFromCloudinary = async (uris , resource_type="image") => {
    try {
        const publicIds = uris.map(uri => (
            uri?.split("/")?.[7]?.split(".")[0]
        )) 

        await cloudinary.api.delete_resources(publicIds, {
            resource_type,
            type: "upload",
            invalidade: true,
        })
        console.log("File has been successfully deleted from the cloudinary")
    } catch (error) {
        console.error("Error while deleting file from cloudinary ", error)
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }