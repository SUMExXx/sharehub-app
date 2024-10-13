import { Image } from "../models/image";
import { Group } from "../models/group";
import { env } from "../utils/env";
import fs from 'fs';
import path from 'path';
import axios from 'axios';

/* const saveImage = async (groupId: string, imageId: string) => {
    const gid = groupId;
    const imgId = imageId;
    //const uid = req.body.user_id;
    const uid = env.USER_ID;

    let imageDetails: Image;

    try{
        
        const imageDetailsURL = `${env.API_BASE_URL}/users/getImageDetails`;

        await fetch(imageDetailsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ group_id: gid, user_id: uid, image_id: imgId }),
        }).then( async (response) => {
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await response.json().then(result => {
                imageDetails = result.imageDetails;
            });
        })

    } catch (error){
        console.log("Error:", error); 
    }
    
    try {
    
        const targetUrl = `${env.API_BASE_URL}/users/getImage`;
    
        const data = {
            'user_id': uid,
            'group_id': gid,
            'image_id': imgId
        }
    
        await axios.post(targetUrl, data, {
            responseType: 'arraybuffer', // Important to specify that we expect binary data
        }).then( async (response) => {

            if(response.status == 200){

                const responseData = response.data; // This will be the binary image data
                const jsonResponse = response.headers['content-type'].includes('application/json') ? JSON.parse(responseData).imageData : null;

                // Extract the image data (assuming it’s in base64 format)
                const imageBase64 = jsonResponse.image.replace(/^data:image\/\w+;base64,/, '');

                if(jsonResponse == null){
                    return console.log('No JSON data received');
                }

                if(jsonResponse.name == imageDetails.name && jsonResponse.size == imageDetails.size && jsonResponse.extension == imageDetails.extension){
                    if(fs.existsSync(path.join(env.STORAGE_PATH, `${gid}`, `${jsonResponse.name}.${jsonResponse.extension}`))){
                        return console.log('Image already exists');
                    }else{
                        const imageBuffer = Buffer.from(imageBase64, 'base64');
                        fs.writeFileSync(path.join(env.STORAGE_PATH, `${gid}`, `${jsonResponse.name}.${jsonResponse.extension}`), imageBuffer);

                        try{

                            const ackowledgementUrl = `${env.API_BASE_URL}/users/imageReceivedAcknowledgement`;
    
                            const data = {
                                'user_id': uid,
                                'group_id': gid,
                                'image_id': imgId
                            }

                            await axios.post(ackowledgementUrl, data).then( async (response) => {
                                if(response.status == 200){
                                    console.log(`Saved new image ${jsonResponse.name}.${jsonResponse.extension}`);
                                    return 200;
                                } else{
                                    fs.unlinkSync(path.join(env.STORAGE_PATH, `${gid}`, `${jsonResponse.name}.${jsonResponse.extension}`));
                                    console.error('Ackowledgement failed');
                                    return 400;
                                }
                            })

                        } catch (error){
                            fs.unlinkSync(path.join(env.STORAGE_PATH, `${gid}`, `${jsonResponse.name}.${jsonResponse.extension}`));
                            return 400;
                        }
                    }
                } else {
                    console.error('Image details don\'t match');
                    return 400;
                }
            
            }else{
                console.error('Failed to fetch images from group');
                return 400;
            }
        })
    
    } catch (error) {
        // console.error('Error:', error);
        console.error('An error occured in fetching', error);
        return 400;
    }
} */

    const saveImage = async (groupId: string, imageId: string) => {
    const gid = groupId;
    const imgId = imageId;
    const uid = env.USER_ID;

    let imageDetails: Image;

    try {
        const imageDetailsURL = `${env.API_BASE_URL}/users/getImageDetails`;
        const detailsResponse = await fetch(imageDetailsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ group_id: gid, user_id: uid, image_id: imgId }),
        });

        if (!detailsResponse.ok) {
            throw new Error(`Failed to fetch image details. Status: ${detailsResponse.status}`);
        }

        const result = await detailsResponse.json();
        imageDetails = result.imageDetails;
    } catch (error) {
        console.error("Error fetching image details:", error);
        return 400;
    }

    try {
        const targetUrl = `${env.API_BASE_URL}/users/getImage`;
        const data = { user_id: uid, group_id: gid, image_id: imgId };

        const imageResponse = await axios.post(targetUrl, data, {
            responseType: "arraybuffer",
        });

        if (imageResponse.status !== 200) {
            console.error("Failed to fetch image");
            return 400;
        }

        const responseData = imageResponse.data;
        const jsonResponse = imageResponse.headers["content-type"].includes("application/json")
            ? JSON.parse(responseData).imageData
            : null;

        if (!jsonResponse) {
            console.log("No JSON data received");
            return 400;
        }

        const imageBase64 = jsonResponse.image.replace(/^data:image\/\w+;base64,/, "");

        if (
            jsonResponse.name === imageDetails.name &&
            jsonResponse.size === imageDetails.size &&
            jsonResponse.extension === imageDetails.extension
        ) {
            const filePath = path.join(env.STORAGE_PATH, `${gid}`, `${jsonResponse.name}.${jsonResponse.extension}`);

            if (fs.existsSync(filePath)) {
                console.log("Image already exists");
                return 200;
            }

            const imageBuffer = Buffer.from(imageBase64, "base64");
            fs.writeFileSync(filePath, imageBuffer);

            try {
                const acknowledgementUrl = `${env.API_BASE_URL}/users/imageReceivedAcknowledgement`;
                const ackData = { user_id: uid, group_id: gid, image_id: imgId };

                const ackResponse = await axios.post(acknowledgementUrl, ackData);

                if (ackResponse.status === 200) {
                    console.log(`Saved new image ${jsonResponse.name}.${jsonResponse.extension}`);
                    return 200;
                } else {
                    fs.unlinkSync(filePath);
                    console.error("Acknowledgement failed");
                    return 400;
                }
            } catch (ackError) {
                fs.unlinkSync(filePath);
                console.error("Acknowledgement error:");
                return 400;
            }
        } else {
            console.error("Image details do not match");
            return 400;
        }
    } catch (error) {
        console.error("An error occurred while fetching the image:");
        return 400;
    }
};

export default saveImage;