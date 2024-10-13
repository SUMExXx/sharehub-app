import React, { useContext, useState } from "react";
import { ArrowDownload16Regular, ArrowDownload24Regular } from '@fluentui/react-icons';
import { GroupContext } from "../context/groupContext";

interface ThumbnailBoxProps{
    thumbIdProp: string,
    thumbNameProp: string,
    thumbURLProp: string,
    thumbOwnerProp: string,
    thumbOriginalURLProp: string,
    thumbStatusProp: string,
    groupId: string
}

const ThumbnailBox: React.FC<ThumbnailBoxProps> = ({ thumbIdProp, thumbNameProp, thumbURLProp, thumbOwnerProp, thumbOriginalURLProp, thumbStatusProp, groupId }) => {

    const [imageLoading, setImageLoading] = useState(false);

    const downloadImage = async () => {
        setImageLoading(true)
        await window.electronAPI.saveImage(groupId, thumbIdProp).then((response: number) => {
            
            if(response == 200){
                console.log("successfully saved")
                setImageLoading(false);
            }else{
                console.log("Error");
                setImageLoading(false);
            }
        });
    }
    
    return ( 
        <button onClick={downloadImage} className={`flex justify-center items-center h-[200px] w-[200px] border border-customDarkGrey group rounded-[10px] bg-cover`} title={`${thumbNameProp}`} style={{backgroundImage: `url('${thumbURLProp}')`, backgroundRepeat: 'no-repeat'}}>
            {
                imageLoading? 
                <div className="flex items-center justify-center">
                    <div className="w-[40px] h-[40px] border-4 border-t-4 border-customLightGrey border-t-customDarkGrey rounded-full animate-spin"></div>
                </div> : 
                <div className="flex justify-end items-end p-[10px] min-h-full min-w-full hover:backdrop-blur hover:justify-center hover:items-center group rounded-[10px] transition-colors duration-1000">
                    <div className={`flex justify-center items-center min-h-[30px] min-w-[30px] rounded-full bg-customMediumGrey group-hover:hidden text-white transition-opacity duration-300 ease-in-out hover:opacity-0`}>
                        <ArrowDownload16Regular />
                    </div>
                    <div className={`justify-center items-center min-h-[40px] min-w-[40px] bg-customLightGrey rounded-full group-hover:flex hidden text-customMediumGrey transition-opacity duration-1000 ease-in-out hover:opacity-100`}>
                        <ArrowDownload24Regular />
                    </div>
                </div>
            }
        </button>
    );
};

export default ThumbnailBox;