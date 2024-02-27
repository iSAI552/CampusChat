import fs from "fs";
import path from "path";

export function remvoeTempFilesSync() {
    const tempFolderPath = "./public/temp";

    try {
        if (fs.existsSync(tempFolderPath)) {
            const files = fs.readdirSync(tempFolderPath);

            if (files.length > 0) {
                files.forEach((file) => {
                    if (file !== ".gitkeep") {
                        const filepath = path.join(tempFolderPath, file);
                        fs.unlinkSync(filepath);
                        console.log(`File ${filepath} removed successfully`);
                    }
                });
            } else {
                console.log(
                    "Temp Folder is empty, continuing without any removal"
                );
            }
        } else {
            console.log(
                "Temp folder does not exist continuing without any removal"
            );
        }
    } catch (error) {
        console.error(
            "Error while removing the files from the temp folder",
            error
        );
    }
}
