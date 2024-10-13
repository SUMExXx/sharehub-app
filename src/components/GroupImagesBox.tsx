import React, { useEffect, useState } from "react";
import { Subtract16Regular } from '@fluentui/react-icons';
import { Thumbnail } from "../models/thumbnail";
import ThumbnailBox from "./ThumbnailBox";
import { env } from "../utils/env";

interface GroupImagesBoxProps{
    groupId: string,
}

interface GroupImagesData{
    thumbnails: Thumbnail[]
}

const GroupImagesBox: React.FC<GroupImagesBoxProps> = ({groupId}) => {
    
    const [thumbnailsData, setThumbnailsData] = useState<GroupImagesData>();
    
    useEffect(() => {
        const initializeApp = async () => {
            try {
                await fetch(`${env.API_BASE_URL}/users/getThumbnails`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ group_id: groupId }),
                }).then( async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const result = await response.json();
                    setThumbnailsData(result);
                })
            } catch (error) {
                console.error("Error:", error); 
            }
        };

        if(groupId != ""){
            initializeApp();
        }

    }, [groupId]);

    // useEffect(() => {
    //     console.log(groupId) 
    // }, []);

    return (
        <div className="flex flex-wrap justify-center items-start p-[20px] gap-[20px] h-full w-full max-h-full overflow-scroll no-scrollbar">
            {
                thumbnailsData?.thumbnails.map((thumb, index) => <ThumbnailBox key={index} thumbIdProp={thumb.id} thumbNameProp={thumb.name} thumbOriginalURLProp={""} thumbOwnerProp={thumb.owner} thumbStatusProp={""} thumbURLProp={thumb.thumbnailUrl} groupId={groupId}/>)
            }
        </div>
    );
};

export default GroupImagesBox;