import { Group } from "../models/group";
import { env } from "../utils/env";
import fs from 'fs';
import path from 'path';

const ensureFoldersExist = (groups: Group[], storageDir: string) => {
    groups.forEach(group => {
        const folderPath = path.join(storageDir, group.id);
        
        // Check if the folder exists
        fs.access(folderPath, fs.constants.F_OK, (err) => {
            if (err) {
                // Folder does not exist, create it
                fs.mkdir(folderPath, { recursive: true }, (err) => {
                    if (err) {
                        console.error(`Error creating folder ${group.id}:`, err);
                    } else {
                        console.log(`Created folder: ${group.id}`);
                    }
                });
            } else {
                console.log(`Folder already exists: ${group.id}`);
            }
        });
    });
}

const initRoot = async () => {
    try {
        await fetch(`${env.API_BASE_URL}/users/getGroups`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: env.USER_ID }),
        }).then( async (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            fs.mkdir(env.STORAGE_PATH, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating root directory:', err);
                }
            });

            fs.mkdir(env.STORAGE_PATH, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating root directory:', err);
                } else {
                    ensureFoldersExist(result.groups, env.STORAGE_PATH);
                }
            });
        })
    } catch (error) {
        console.error("Error:", error); 
    }
}

export default initRoot;