import { env } from "../utils/env";
import fs from 'fs';
import path from 'path';
import express from 'express';
import axios from "axios";
import os from 'os';

const expressApp = express();

expressApp.use(express.json());

expressApp.use(express.urlencoded({ extended: true }));

expressApp.post('/sendImage', (req, res) => {
  const gid = req.body.group_id;
  const name = req.body.name;
  const extension = req.body.extension;
  console.log(gid, extension, name)

  try {
      const imagePath = path.join(env.STORAGE_PATH, gid, `${name}.${extension}`);

      if (!fs.existsSync(imagePath)) {
          return res.status(404).json({ error: 'File not found' });
      }

      const imageBuffer = fs.readFileSync(imagePath);

      const base64Image = imageBuffer.toString('base64');

      const responseData = {
          group_id: gid,
          name: name,
          size: fs.statSync(imagePath).size,
          extension: extension,
          image: `data:image/${extension};base64,${base64Image}`, // Send image as base64 data URI
          message: 'Image sent successfully',
      };

      res.status(200).json(responseData);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while sending the image' });
  }

});

const getPrivateIP = () => {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    
    if (interfaces) {
      for (const netInterface of interfaces) {
        // Check for IPv4 and non-internal (non-loopback) interfaces
        if (netInterface.family === 'IPv4' && !netInterface.internal) {
          return netInterface.address;
        }
      }
    }
  }
}

const getPublicIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching the public IP address:', error);
  }
}

const updateIP = async () => {
  // const ip = getPrivateIP();
  const ip = await getPublicIP();
  await fetch(`${env.API_BASE_URL}/users/updateUserDetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: env.USER_ID, ip_address: ip, port: env.EXPRESS_PORT }),
  }).then( async (response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("IP Address updated!")
  })
}

export const startExpressServer = () => {
  expressApp.listen(env.EXPRESS_PORT, () => {
    console.log(`Express server running on http://localhost:${env.EXPRESS_PORT}`);
  });

  updateIP();
};