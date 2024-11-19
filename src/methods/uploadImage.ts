import { Image } from "../models/image";
import { Group } from "../models/group";
import { env } from "../utils/env";
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { dialog } from "electron";
import FormData from 'form-data';
import mime from 'mime-types';
import sharp from 'sharp'

const uploadImage = async (groupId: string) => {
    const gid = groupId;
    const uid = env.USER_ID;

    try {
        const { name, extension, url, size } = await selectFile();

        console.log(`${name} ${extension} ${size} ${url}`);

        const targetUrl = `${process.env.API_BASE_URL}/users/upload`;

        // Resize image to thumbnail size
        const thumbnailBuffer = await sharp(url).resize({ width: 50 }).toBuffer();
        const mimeType = mime.lookup(url) || undefined;

        // Create form data
        const formData = new FormData();
        formData.append('image', thumbnailBuffer, {
            filename: `${name}`,
            contentType: mimeType,
        });
        formData.append('name', name);
        formData.append('extension', extension);
        formData.append('size', size);
        formData.append('user_id', uid);
        formData.append('group_id', gid);

        // Send POST request
        const response = await axios.post(targetUrl, formData, {
            headers: formData.getHeaders(),
        });

        if (response.status === 201) {
            const targetPath = path.join(env.STORAGE_PATH, gid, `${name}.${extension}`);
            await fs.promises.copyFile(url, targetPath);
            console.log("File copied successfully");
        } else {
            console.log("not uploaded");
        }
    } catch (error) {
        console.error('Error during upload:', error);
    }

    return 200;
};

const selectFile = async () => {
    let data = {
        name: "",
        extension: "",
        size: 0,
        url: ""
    };

    try {
        const file = await new Promise<{ canceled: boolean; filePaths: string[] }>((resolve, reject) => {
            dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
            }, (filePaths) => {
                if (filePaths === undefined) {
                    reject(new Error("No file selected"));
                } else {
                    resolve({ canceled: false, filePaths });
                }
            });
        });

        if (!file.canceled) {
            const filePath = file.filePaths[0];

            // Get file information using fs.promises.stat
            const stats = await fs.promises.stat(filePath);
            data.name = path.parse(filePath).name;
            data.size = stats.size;
            data.extension = path.extname(filePath).slice(1);
            data.url = filePath;
        }
    } catch (err) {
        console.error("Error opening file dialog or fetching file stats:", err);
    }
    
    return data;
};

export default uploadImage;